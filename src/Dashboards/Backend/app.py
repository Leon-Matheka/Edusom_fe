from flask import Flask, jsonify
from flask_cors import CORS
import json
import os
from visualizations.generate_insights import analyze_student_performance

app = Flask(__name__)
CORS(app)  # Allow requests from any origin (React frontend)

# Path constants
CSV_PATH = os.path.join("backend", "data", "student_performance.csv")
JSON_PATH = os.path.join("backend", "visualizations", "student_insights.json")


@app.route("/")
def home():
    return jsonify({"message": "EDUSOM AI backend is running. Use /api/student_insights/<student_id>"})


@app.route("/api/student_insights/<student_id>", methods=["GET"])
def get_student_insights(student_id):
    """
    Generates and serves student performance data as JSON for a specific student.
    If student not found, returns error message.
    """
    try:
        if not os.path.exists(CSV_PATH):
            return jsonify({"error": f"CSV data not found at {CSV_PATH}"}), 404

        result = analyze_student_performance(CSV_PATH, student_id)

        # If student ID not present in CSV
        if not result["subject_summary"]:
            return jsonify({"error": f"No data found for student_id: {student_id}"}), 404

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/student_insights", methods=["GET"])
def get_default_student():
    """
    Default route returning pre-generated JSON for frontend testing.
    """
    try:
        if not os.path.exists(JSON_PATH):
            return jsonify({"error": f"JSON file not found at {JSON_PATH}"}), 404

        with open(JSON_PATH, "r") as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("Starting EDUSOM AI Backend...")
    app.run(debug=True, port=5000)
