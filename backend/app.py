from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['POST'])
def test_endpoint():
    data = request.json
    return jsonify({"message": "Received data", "data": data})

if __name__ == '__main__':
    app.run(debug=True)