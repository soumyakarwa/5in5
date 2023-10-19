import stanfordnlp

stanfordnlp.download('en')
nlp = stanfordnlp.Pipeline(lang='en')
doc = nlp("She is running quickly.")
for sentence in doc.sentences:
    for word in sentence.words:
        print(word.text, word.upos)
