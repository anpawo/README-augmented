#!/usr/bin/env python3


import subprocess as sb
import os
import signal


DIRECTORY = "/home/roussetmarius/self/organisation/"


def main():
    print("pwd=", os.getcwd())
    server = sb.Popen("make -C " + DIRECTORY + " ../ run", shell=True)
    print("start")
    server.wait()
    # server.send_signal(signal.SIGINT)
    print("end")

if __name__ == '__main__':
    main()