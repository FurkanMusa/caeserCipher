import sys
from PyQt5.QtWidgets import QApplication
from ui import SumUI

class SumController:
    def __init__(self):
        self.app = QApplication(sys.argv)
        self.ui = SumUI()
        self.ui.show()
        self.connect_signals()

    def connect_signals(self):
        self.ui.button_sum.clicked.connect(self.sum)

    def sum(self):
        try:
            input1 = float(self.ui.line_edit1.text())
            input2 = float(self.ui.line_edit2.text())
            result = input1 + input2
            self.ui.result_label.setText('Result: ' + str(result))
        except ValueError:
            self.ui.result_label.setText('Error: Invalid input')

    def run(self):
        sys.exit(self.app.exec_())

if __name__ == '__main__':
    controller = SumController()
    controller.run()
