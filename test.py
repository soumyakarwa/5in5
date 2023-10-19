import PyPDF2
import json
import string
import stanza

with open('clockwork_angel.pdf', 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = {}

    for page_num in range(7, len(reader.pages)):
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
    part_of_speech = {}
    nlp = stanza.Pipeline(lang='en')
    for word in words:
        if (len(word) < 4) or word.isnumeric():
            continue
        word_count[word] = word_count.get(word, 0) + 1
    print("word count processed")

    for word in word_count.keys():
        doc = nlp(word)
        for token in doc.sentences[0].words:
            print("in nested loop")
            part_of_speech[token.text] = token.upos
            print(part_of_speech[token.text])

    print("OUT")
    combined_dict = {word: {'count': word_count[word], 'pos': part_of_speech.get(
        word, 'N/A')} for word in word_count}

    # Save the combined dictionary to a JSON file
    with open('text1.json', 'w') as json_file:
        json.dump(combined_dict, json_file)
