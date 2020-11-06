'''
>>> check_email_edu()
True
>>> check_email_regular()
True
>>> check_email_negative()
False
'''

import re

pattern = "[\w\d\.]+@\w+\.[\w\d\.]+"

def check_email_edu():
    email = "student.muller@uni.edu.de"
    regexp = re.compile(pattern)
    return bool(regexp.match(email))

def check_email_regular():
    email = "student1234@gmail.com"
    regexp = re.compile(pattern)
    return bool(regexp.match(email))

def check_email_negative():
    email = "#-*&12@com"
    regexp = re.compile(pattern)
    return bool(regexp.match(email))

if __name__ == '__main__':
    import doctest
    doctest.testmod()