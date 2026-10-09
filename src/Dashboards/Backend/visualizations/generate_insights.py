import pandas as pd
import numpy as np
import json
import os

def analyze_student_performance(csv_path, student_id):
    """
    Reads student performance CSV and generates analysis for a specific student.
    Returns a JSON-serializable dictionary with subject summary, weak topics, and curriculum suggestions.
    """

    # Check if CSV exists
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"CSV file not found at {csv_path}")

    df = pd.read_csv(csv_path)

    # Filter student data
    student_df = df[df['student_id'] == student_id]

    if student_df.empty:
        # No data found for this student
        return {
            "student_id": student_id,
            "subject_summary": [],
            "weak_topics": [],
            "curriculum_suggestions": []
        }

    # Compute per-subject summary
    subject_summary = (
        student_df.groupby('subject')
        .agg({'score': 'mean'})
        .rename(columns={'score': 'average_score'})
        .reset_index()
    )

    # Assign random improvement trends
    subject_summary['trend'] = np.random.choice(['Improving', 'Stable', 'Declining'], len(subject_summary))

    # Identify weak modules (score < 65)
    weak_modules = student_df[student_df['score'] < 65][['subject', 'score', 'weak_areas']]

    # Personalized curriculum suggestions
    curriculum = [
        {
            "subject": row['subject'],
            "focus_topic": row['weak_areas'],
            "recommendation": f"Revise {row['weak_areas']} in {row['subject']} using interactive examples."
        }
        for _, row in weak_modules.iterrows()
    ]

    result = {
        "student_id": student_id,
        "subject_summary": subject_summary.to_dict(orient="records"),
        "weak_topics": weak_modules.to_dict(orient="records"),
        "curriculum_suggestions": curriculum
    }

    # Save JSON safely
    output_dir = os.path.join("backend", "visualizations")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "student_insights.json")

    with open(output_path, "w") as f:
        json.dump(result, f, indent=4)

    return result


if __name__ == "__main__":
    # Example usage
    csv_file = os.path.join("backend", "data", "student_performance.csv")
    student_id = "ST018"
    insights = analyze_student_performance(csv_file, student_id)
    print(json.dumps(insights, indent=2))

