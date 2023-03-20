import sys
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QLabel, QLineEdit

class Sum(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Sum')
        self.setGeometry(100, 100, 300, 200)
        self.initUI()

    def initUI(self):
        # Create label and line edits
        self.label1 = QLabel('Input 1:')
        self.line_edit1 = QLineEdit()

        self.label2 = QLabel('Input 2:')
        self.line_edit2 = QLineEdit()

        self.result_label = QLabel('Result: ')

        # Create buttons
        self.button_sum = QPushButton('Sum')

        # Create horizontal boxes
        hbox1 = QHBoxLayout()
        hbox1.addWidget(self.label1)
        hbox1.addWidget(self.line_edit1)

        hbox2 = QHBoxLayout()
        hbox2.addWidget(self.label2)
        hbox2.addWidget(self.line_edit2)

        hbox3 = QHBoxLayout()
        hbox3.addWidget(self.result_label)

        hbox4 = QHBoxLayout()
        hbox4.addWidget(self.button_sum)

        # Create vertical box
        vbox = QVBoxLayout()
        vbox.addLayout(hbox1)
        vbox.addLayout(hbox2)
        vbox.addLayout(hbox3)
        vbox.addLayout(hbox4)

        self.setLayout(vbox)

        # Connect signals to slots
        self.button_sum.clicked.connect(self.sum)

    def sum(self):
        try:
            input1 = float(self.line_edit1.text())
            input2 = float(self.line_edit2.text())
            result = input1 + input2
            self.result_label.setText('Result: ' + str(result))
        except ValueError:
            self.result_label.setText('Error: Invalid input')

if __name__ == '__main__':
    app = QApplication(sys.argv)
    sum_window = Sum()
    sum_window.show()
    sys.exit(app.exec_())
