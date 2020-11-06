from difflib import SequenceMatcher
import jellyfish

welcome = "Hi! I'm Arthur, the customer support chatbot. How can I help you?"

questions = (
    "The app if freezing after I click run button",
    "I don't know how to proceed with the invoice",
    "I get an error when I try to install the app",
    "It crash after I have updated it",
    "I cannot login in to the app",
    "I'm not able to download it"
            )

answers = (
        "You need to clean up the cache. Please go to ...",
        "Please go to Setting, next Subscriptions and there is the Billing section",
        "Could you please send the log files placed in ... to ...",
        "Please restart your PC",
        "Use the forgot password button to setup a new password",
        "Probably you have an ad blocker plugin installed and it blocks the popup with the download link"
            )

similarity_treshold = 0.2

def similarity_measure(a, b):
    distance = jellyfish.levenshtein_distance(a,b)
    return 1-distance/max(len(a), len(b))

def get_highest_similarity(customer_question):
    max_similarity = 0
    highest_index = 0
    for question_id in range(len(questions)):
        current_question = questions[question_id]
        similarity = similarity_measure(current_question, customer_question)
        if similarity > max_similarity:
            highest_index = question_id
            max_similarity = similarity
    if max_similarity > similarity_treshold:
        return answers[highest_index]
    else:
        return "The issues has been saved. We will contact you soon."


def run_chatbot():
    print(welcome)
    while 1:
        question = input()
        if question == 'thank you':
            break
        answer = get_highest_similarity(question)
        print(answer)


run_chatbot()