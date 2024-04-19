## Introduction
### ThermoTrack: Your Smart Health Companion App!

Take control of your health with ThermoTrack, the innovative cross-platform app designed to simplify how you monitor your body temperature. Whether you're feeling a bit under the weather or keeping tabs for fitness, ThermoTrack offers a seamless way to use your smartphone. **Just snap a photo or upload an image of your thermometer, and let ThermoTrack do the rest!**

### Key Features

- **Capture and Upload:** Easily take pictures of your thermometer readings or upload existing photos to record your temperature instantly.
  
- **Visual Temperature Charts:** View comprehensive charts that map your temperature fluctuations over time. These visual aids help you understand trends and patterns in your health at a glance.

- **AI-Powered Health Assistant:** Have health questions? Chat with our AI assistant anytime for insights and advice on your temperature readings and overall well-being. It’s like having a health expert in your pocket!

ThermoTrack is more than just a temperature tracker; it’s your personal health guide. Download now and start tracking your way to better health today!

Experience the future of health monitoring with ThermoTrack—where convenience meets accuracy.

### Technical Stack:

- Frontend: React Native for cross-platform mobile app development.
- Computer Vision: OpenCV for accurate image analysis and temperature extraction.
- Backend: Firebase for authentication, database, and storage solutions.
- AI Integration: OpenAI for intelligent, conversational health insights.

### Preview

![IMG_0616](https://github.com/MedicalApp6510/ThermoTrack_MobileApp_FE/assets/82356933/21c506b8-fdf9-44e5-9226-558c251cd07c)

![IMG_0615](https://github.com/MedicalApp6510/ThermoTrack_MobileApp_FE/assets/82356933/ba6d0793-a6e0-439b-8a92-2e58cf043d87)


## Start Here

Welcome to ThermoTrack, your comprehensive health monitoring solution! This guide will help you set up the ThermoTrack app on your local machine using Expo. Follow the steps below to get started.

### Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your machine.
- Expo Client app installed on your mobile device ([Download from App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www))

### Setup Instructions

1. **Download the Repository and open the Project:**

2. **Environment Configuration:**

   In the root directory of the project, create a `.env` file to store your private keys and other environment variables. Add the following contents:

   ```javascript
   REACT_APP_FIREBASE_API_KEY = <your-firebase-api-key>
   REACT_APP_FIREBASE_APP_ID = <your-firebase-app-id>
   REACT_APP_FIREBASE_AUTH_DOMAIN = <your-firebase-auth-domain>
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID = <your-firebase-sender-id>
   REACT_APP_FIREBASE_PROJECT_ID = <your-firebase-project-id>
   REACT_APP_FIREBASE_STORAGE_BUCKET = <your-firebase-storage-bucket>
   REACT_APP_SERVER_URL = <your-server-url>
   REACT_APP_OPENAI_SECRET_KEY = <your-openai-secret-key>
   ```

   Ensure to replace the placeholder values (e.g., `<your-firebase-api-key>`) with your actual Firebase and OpenAI credentials.

4. **Install Dependencies:**

   While in the project directory, run the following command to install all the required dependencies:

   ```bash
   npm install
   ```

5. **Run the App:**

   To start the app, run:

   ```bash
   npm start
   ```

   This command will start the Expo CLI server. A QR code will appear in your terminal or in your command prompt.

6. **Scan the QR Code:**

   Open the Expo Client app on your mobile device and scan the QR code. This will open the ThermoTrack app on your device, allowing you to test it in development mode.

### Using Expo App

Since this is a beta version, the app needs to be run in conjunction with the Expo App. Make sure your mobile device and computer are on the same Wi-Fi network to ensure smooth loading and testing.

### Next Steps

After setting up the app, you can begin to integrate more features or start testing the app's existing functionalities. Enjoy exploring and developing with ThermoTrack!

## Future Prospects of Our Project

Through our ongoing experiments and developments, our application's digital recognition capabilities have significantly expanded beyond merely reading temperatures from thermometers. We have successfully adapted our technology to also read heart rate data and medical barcodes. This advancement underscores our potential to further extend compatibility with an even broader array of medical devices in the future.

Moreover, our "AskAI" service is transforming the app into a vital bridge between medical services and patients. This feature enriches the app's functionality, turning it from a simple data recorder into a comprehensive health assistant. 

Looking ahead, we plan to enhance this service by incorporating more personalized elements. For instance, we aim to adjust normal temperature ranges based on individual user profiles, including factors like weight, height, and medical history.

Additionally, we are looking to integrate extensive medical knowledge into the app. This will enable the app to analyze temperature trends and potentially identify disease patterns, alerting users to seek medical advice at early stages of illness which could be crucial for preventive health care.

These developments will not only enhance user engagement but also significantly contribute to early disease detection and prevention, marking a new era of smart health assistance.
