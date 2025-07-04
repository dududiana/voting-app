# 📊 Voting App (Demo)

Simple mobile voting app for rating 5 departments across 5 categories.

## 🚀 Setup

1. Clone this repo  
2. Replace Firebase config in `src/app.js`
3. In [Firebase Console]:
   - Enable **Firestore** (test mode is fine)
   - Enable **Anonymous Authentication**
4. Deploy: copy `public/` folder after replacing config

## 💻 Usage

- Use unique codes to prevent unauthorised voting
- Customize department names or add admin controls
- Retrieve votes via Firestore and export as CSV
