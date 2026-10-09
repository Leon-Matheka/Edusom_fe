import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing voice interactions with the AI Tutor
 * Uses Web Speech API for speech recognition and synthesis
 */
export const useVoiceInteraction = () => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);
    const [autoSpeak, setAutoSpeak] = useState(true);

    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    // Check browser support on mount
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const supported = !!(SpeechRecognition && window.speechSynthesis);
        setIsSupported(supported);

        if (supported) {
            // Initialize speech recognition
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
                setError(null);
            };

            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;

                // Only set final results
                if (event.results[current].isFinal) {
                    setTranscript(transcriptText);
                }
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setError(event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, []);

    // Start listening
    const startListening = useCallback(() => {
        if (!isSupported) {
            setError('Speech recognition not supported in this browser');
            return;
        }

        if (recognitionRef.current && !isListening) {
            setTranscript('');
            setError(null);

            // Stop any ongoing speech
            if (synthRef.current.speaking) {
                synthRef.current.cancel();
                setIsSpeaking(false);
            }

            try {
                recognitionRef.current.start();
            } catch (err) {
                console.error('Error starting recognition:', err);
                setError(err.message);
            }
        }
    }, [isSupported, isListening]);

    // Stop listening
    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    }, [isListening]);

    // Toggle listening
    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    // Speak text
    const speak = useCallback((text, options = {}) => {
        if (!isSupported || !text) return;

        // Cancel any ongoing speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = options.rate || 1.0;
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 1.0;
        utterance.lang = 'en-US';

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            setIsSpeaking(false);
        };

        synthRef.current.speak(utterance);
    }, [isSupported]);

    // Stop speaking
    const stopSpeaking = useCallback(() => {
        if (synthRef.current.speaking) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return {
        isListening,
        isSpeaking,
        isSupported,
        transcript,
        error,
        autoSpeak,
        setAutoSpeak,
        startListening,
        stopListening,
        toggleListening,
        speak,
        stopSpeaking,
    };
};
