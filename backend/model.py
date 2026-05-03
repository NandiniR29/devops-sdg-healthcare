def predict_risk(age, sugar):
    if age > 50 and sugar > 140:
        return "High Risk"
    elif age > 30:
        return "Medium Risk"
    else:
        return "Low Risk"