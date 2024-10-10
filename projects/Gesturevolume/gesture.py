import cv2
import mediapipe as mp
import math
from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

# MediaPipe hand detection initialization
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_drawing = mp.solutions.drawing_utils

# OpenCV camera initialization
cap = cv2.VideoCapture(0)

# Function to set system volume
def set_system_volume(volume):
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(
        IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume_object = cast(interface, POINTER(IAudioEndpointVolume))
    volume_object.SetMasterVolumeLevelScalar(volume / 100, None)

# Initialize previous wrist position
prev_wrist_y = None

while cap.isOpened():
    success, image = cap.read()
    if not success:
        print("Ignoring empty camera frame.")
        continue

    # Flip the image horizontally and convert the BGR image to RGB
    image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = hands.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Draw hand landmarks
            mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            # Get the wrist position
            wrist = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST]
            current_wrist_y = wrist.y

            # Normalize the wrist's Y position to volume (0 to 100)
            # The y-coordinate of the wrist varies from 0 (top of frame) to 1 (bottom of frame)
            frame_height = image.shape[0]
            volume = int((1 - current_wrist_y) * 100)  # Invert because higher Y is lower volume

            # Ensure volume is within the range [0, 100]
            volume = max(0, min(volume, 100))

            # Set the system volume
            set_system_volume(volume)
            print(f"Volume set to: {volume}")  # Print current volume for debugging

    # Show the image with OpenCV
    cv2.imshow('Hand Tracking', image)
    if cv2.waitKey(5) & 0xFF == 27:  # Break on 'ESC' key
        break

hands.close()
cap.release()
cv2.destroyAllWindows()
