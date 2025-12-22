const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');

    // 1. Extract events array content
    // Look for: export const events: Event[] = [ ... ];
    const startMarker = 'export const events: Event[] = [';
    const endMarker = '];'; // Assuming events array ends with ]; and it's the main closure

    const startIndex = fileContent.indexOf(startMarker);
    if (startIndex === -1) {
        throw new Error('Could not find start of events array');
    }

    // Find the end of the array. Since there might be nested objects, we need to balance brackets or just find the main closing ];
    // But simplest heuristic: the array defines top-level objects.
    // Let's rely on the structure: ... ]; \n\n // Manual Overseas...

    // Better approach: Find the closing ]; that matches the indentation or context. 
    // Given the previous view, it ends before "export const overseasTourVenues"

    // Let's use a flexible extraction:
    // We assume the file is valid TS.
    // We can interpret the content INSIDE `export const events: Event[] = [` and `];` as a JS array if we remove type annotations if any (unlikely in object literals).

    // We'll search for the *next* `export const` or end of file to bound the search for `];`.
    const suffixContent = fileContent.substring(startIndex + startMarker.length);
    const endIndexRelative = suffixContent.indexOf('];');

    // Actually, finding the right closing bracket is critical.
    // Let's assume standard formatting where `];` is on its own line at the start of the line or indented.

    // Let's iterate to find the matching closing bracket.
    let depth = 1;
    let arrayContentEndIndex = -1;
    let currentIdx = startIndex + startMarker.length;

    while (currentIdx < fileContent.length) {
        if (fileContent[currentIdx] === '[') depth++;
        if (fileContent[currentIdx] === ']') depth--;

        if (depth === 0) {
            arrayContentEndIndex = currentIdx;
            break;
        }
        currentIdx++;
    }

    if (arrayContentEndIndex === -1) {
        throw new Error('Could not find end of events array');
    }

    // Now we have the range of the array content (including brackets? No, we started after [)
    // Wait, my loop started AFTER the opening [. So depth 1 is correct. 
    // When depth hits 0, it means we found the closing ].

    const eventsArrayRaw = fileContent.substring(startIndex + startMarker.length, arrayContentEndIndex);

    // Now we need to parse this raw string into objects. 
    // Since it's TS source, it's not valid JSON (keys unquoted, trailing commas).
    // We can use `eval` wrapped in parentheses, but we need to verify input safety or just do it since it's user code.
    // However, `date` fields are strings, so simple sorting is possible if we just regex parse the objects.

    // Robust parsing:
    // Split by `},` to get items?
    // Dangerous if `},` appears in strings.

    // Better: Use `Function` constructor to evaluate the code and return the array.
    // "return [" + eventsArrayRaw + "]"

    // We need to handle any imports or undefined variables.
    // The objects seem simple: id, date, venue, city, artist, poster, slug, gallery.
    // Strings are double quoted.

    const events = eval(`[${eventsArrayRaw}]`);

    if (!Array.isArray(events)) {
        throw new Error('Parsed content is not an array');
    }

    console.log(`Found ${events.length} events.`);

    // Sort by date descending
    events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Descending (Newest -> Oldest)
    });

    // Serialize back to TS/JS object literal format
    // JSON.stringify gives quoted keys "key": "value".
    // We want key: "value".
    // We can post-process the JSON.stringify output.

    const stringify = (obj) => {
        let json = JSON.stringify(obj, null, 4);
        // Remove quotes around keys
        // Regex: "key": -> key:
        // Identify valid JS identifiers: [a-zA-Z_$][a-zA-Z0-9_$]*
        return json.replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g, '$1:');
    };

    // We want the array elements to be indented correctly.
    // JSON.stringify(events, null, 4) produces:
    // [
    //     {
    //         "id": "..."
    //     },
    // ...
    // ]

    // We need to remove the outer [ and ] because we will inject them back with markers.
    let newArrayContent = stringify(events);

    // Remove outer brackets
    newArrayContent = newArrayContent.substring(newArrayContent.indexOf('[') + 1, newArrayContent.lastIndexOf(']'));

    // Construct new file content
    const newFileContent =
        fileContent.substring(0, startIndex + startMarker.length) +
        newArrayContent +
        fileContent.substring(arrayContentEndIndex);

    fs.writeFileSync(DATA_FILE, newFileContent, 'utf-8');
    console.log('✅ Successfully sorted events by date (descending) and updated data.ts');

} catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
}
