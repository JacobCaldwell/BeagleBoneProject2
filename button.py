# import Adafruit_BBIO.GPIO as GPIO
# import time
#
# GPIO.setup("P8_8", GPIO.IN)
# GPIO.setup("P8_10", GPIO.IN)
#
# # GPIO.add_event_detect("P8_8", GPIO.RISING)
# # GPIO.add_event_detect("P8_10", GPIO.RISING)
#
#
# while 1:
#     print GPIO.input("P8_8")
#     print GPIO.input("P8_10")
#     time.sleep(1)
#


import Adafruit_BBIO.ADC as ADC
ADC.setup()
from time import sleep

analogPin="P9_39"

while(1):
    potVal=ADC.read(analogPin)
    potVolt=potVal*1.8
    print "The Potentiometer Voltage is: ",potVolt
    sleep(.5)





