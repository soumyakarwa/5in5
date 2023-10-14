import PyPDF2
import json
import string

with open('clockwork_angel.pdf', 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = {}

    print(len(reader.pages))
    for page_num in range(len(reader.pages)):
        page = reader.pages[page_num]
        text[page_num] = page.extract_text()

    combined_text = ''.join(text.values())

    unicode_chars = ['\u2014', '\u2013',
                     '\u2018', '\u201C', '\u201D', '\u2019em', '\u2019']

    for unicode_char in unicode_chars:
        combined_text = combined_text.replace(unicode_char, ' ')

    translator = str.maketrans('', '', string.punctuation)
    words = [word.translate(translator).lower() for line in combined_text.split(
        '\n') for word in line.split()]

    word_count = {}
    for word in words:
        if (len(word) < 4) or word.isnumeric():
            continue
        word_count[word] = word_count.get(word, 0) + 1

    # sorted_word_count = {k: v for k, v in sorted(
    #     word_count.items(), key=lambda item: item[1], reverse=True)}

    with open('text1.json', 'w') as json_file:
        json.dump(word_count, json_file)
