from flask import *
import serial
import time
import json
from flask_socketio import SocketIO, emit
import threading
import datetime

use_serial = True

if use_serial:
    serial_port = serial.Serial('/dev/cu.usbmodem141101', 115200)
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, ping_timeout=50, ping_interval=1)
start_time = time.time()

baud = 115200

full_data = []
area1 = [0,0,0,0,0,0,0,0,0,0,0,0]
area2 = [0,0,0,0,0,0,0,0,0,0,0,0]
area3 = [0,0,0,0,0,0,0,0,0,0,0,0]
area4 = [0,0,0,0,0,0,0,0,0,0,0,0]
line = []

@app.route("/")
@app.route("/report/department/daily")
def daily_overview():
    global full_data
    listed = []
    for data in full_data:
        listed.append(data['count'])
    return render_template('report-department-daily.html', data=json.dumps(listed))

@app.route("/report/department/group")
def report_department_group():
    global area1
    global area2
    global area3
    global area4
    print(area1, area2, area3)
    return render_template('report-department-group.html', area1=area1, area2=area2, area3=area3, area4=area4)

@app.route("/report/department/map")
def report_department_map():
    global area1
    global area2
    global area3
    global area4
    print(area1, area2, area3)
    return render_template('report-department-map.html', area1=area1, area2=area2, area3=area3, area4=area4)

@app.route("/report/group/lab1")
@app.route("/report/group/lab2")
@app.route("/report/group/office1")
@app.route("/report/group/office2")
def report_group_daily():
    global area1
    global area2
    global area3
    global area4
    print(area1, area2, area3)
    return render_template('group-daily.html', area1=area1, area2=area2, area3=area3, area4=area4)

@app.route("/report/group/map")
def report_group_map():
    global area1
    global area2
    global area3
    global area4
    print(area1, area2, area3)
    return render_template('group-map.html', area1=area1, area2=area2, area3=area3, area4=area4)

@app.route("/analysis/data/lab1")
@app.route("/analysis/data/lab2")
@app.route("/analysis/data/office1")
@app.route("/analysis/data/office2")
@app.route("/analysis/data/department")
def analysis_data():
    global full_data
    return render_template("settings-data.html", data=json.dumps(full_data))

@app.route("/setting/group")
def settings_group():
    return render_template("settings-hospital.html")

@app.route("/setting/device")
def settings_device():
    return render_template("settings-device.html")

@socketio.on('connect')
def socketio_connect():
    print("someone connected")

@socketio.on('disconnect', namespace='/mynamespace')
def socketio_disconnect():
    session.clear()
    print("disconnected")

# https://networklore.com/start-task-with-flask/
@app.before_first_request
def activate_job():
    def update_data(data):
        global r
        global full_data
        global line
        global area1
        global area2
        global area3
        global area4
        global socketio
        print("hell o")
        while use_serial:
            for c in data.read():
                #line 변수에 차곡차곡 추가하여 넣는다.
                line.append(chr(c))
                print(c)
                if c == 10: #라인의 끝을 만나면..
                    #데이터 처리 함수로 호출
                    res = "".join(line)
                    struct = {}
                    print(res)
                    struct['code'] = int(res[1:3])
                    struct['office'] = int(res[1:3])
                    struct['type'] = int(res[3:4])
                    struct['num'] = int(res[4:8], 16)
                    struct['time'] = int(time.time() - start_time)
                    struct['real_time'] = datetime.datetime.now().strftime("%H시 %M분 %S초")
                    i = int(struct['time']/35)

                    print(struct)
                    if(struct['code'] % 4 == 0 and struct['type'] == 3):
                        #area1[i] += struct['num']
                        area1[i] += 1
                    elif(struct['code'] % 4 == 1 and struct['type'] == 3):
                        #area2[i] += struct['num']
                        area2[i] += 1
                    elif(struct['code'] % 4 == 2 and struct['type'] == 3):
                        #area3[i] += struct['num']
                        area3[i] += 1
                    elif(struct['code'] % 4 == 3 and struct['type'] == 3):
                        # area4[i] += struct['num']
                        area4[i] += 1
                    print(area1)
                    socketio.emit("update1", {'data' : area1}, namespace="/area_update")
                    print(area2)
                    socketio.emit("update2", {'data' : area2}, namespace="/area_update")
                    print(area3)
                    socketio.emit("update3", {'data' : area3}, namespace="/area_update")
                    print(area4)
                    socketio.emit("update4", {'data' : area4}, namespace="/area_update")
                    del line[:]

    if use_serial:
        thread = threading.Thread(target=update_data, args=(serial_port,))
        thread.start()

if __name__ == "__main__":
    if use_serial:
        # xbee = XBee(serial_port, callback=update_data)
        # update_data(serial_port)
        print("Use Serial")

    print("XBee set")
    #app.run()
    print("socketio.run()")
    socketio.run(app)
    print("socketio.run() fin")

    # xbee.halt()
    if use_serial:
        serial_port.close()
