from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QLabel, QLineEdit, \
    QDesktopWidget


class SumUI(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Bilgisayar Güvenliği ve Kriptografi 01 - Furkan Musa Titrek')
        self.setWindowIcon(QIcon('src/icon.png'))
        self.setGeometry(0, 0, 500, 200)
        self.initUI()
        qr = self.frameGeometry()
        cp = QDesktopWidget().availableGeometry().center()
        qr.moveCenter(cp)
        self.move(qr.topLeft())

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
