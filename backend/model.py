def predict_risk(age, sugar):

    # Invalid case
    if sugar <= 0:
        return "Invalid Input"

    if age > 50 and sugar >= 140:
        return "High Risk"
    elif age > 30 or sugar > 120:
        return "Medium Risk"
    else:
        return "Low Risk"