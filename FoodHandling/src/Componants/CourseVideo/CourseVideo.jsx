/** @format */
import './CourseVideo.css';
import { useState, useEffect } from 'react';
import { BiSolidSkipNextCircle } from "react-icons/bi";
import quizData from './quizData';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import PDF from './PDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

export const CourseVideo = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [videoNumber, setVideoNumber] = useState(1);
    const [showQuiz, setShowQuiz] = useState(false);
    const [answers, setAnswers] = useState({});
    const [quizFailed, setQuizFailed] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [userPaymentCompleted, setUserPaymentCompleted] = useState(false);
    const [preview, setPreview] = useState(false);
    const [certificateData, setCertificateData] = useState('');
    const navigate = useNavigate();

    const videoUrl1 = 'https://drive.google.com/uc?id=1XbXduXzDPMpt90hZB7vWmrJaWCLaI5yP';
    const videoUrl2 = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    const videoUrl3 = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
    const videoUrl4 = 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
    const videoUrl5 = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';

    const fetchUserPaymentStatus = async (id) => {
        try {
            const res = await axios.get(`http://localhost:4000/stripe/status/${id}`);
            if (res.status === 200) {
                console.log('User Payment verified.');
                try {
                    const res2 = await axios.get(`http://localhost:4000/stripe/get-certificate/${id}`);
                    if (res2.status === 200) {
                        console.log('Course Completed.');
                        const userData = res2.data;
                        const data = {
                            firstname: userData.user.firstname,
                            lastname: userData.user.lastname,
                            email: userData.user.email,
                            score: userData.score,
                            totalScore: userData.totalScore,
                            percentage: userData.percentage,
                        }
                        setCertificateData(data);
                        setShowCertificate(true);
                        setShowQuiz(true);
                    }
                } catch (error) {
                    console.log('Course not completed yet!');
                }
                setUserPaymentCompleted(true);
            }
        } catch (error) {
            console.log('Error: ', error);
            setUserPaymentCompleted(false);
            if (error.response.status === 404) {
                console.log('User Payment is not completed yet.');
            }
        }
    };

    useEffect(() => {
        const isUserLoggedIn = Cookies.get('userData');
        if (isUserLoggedIn) {
            const userID = JSON.parse(Cookies.get('userData'))._id;
            fetchUserPaymentStatus(userID);
        }
        else {
            console.log('Not Logged In');
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [showQuiz]);

    const getVideoNumber = () => {
        if (videoNumber === 1) {
            return 'first';
        }
        else if (videoNumber === 2) {
            return 'second';
        }
        else if (videoNumber === 3) {
            return 'third';
        }
        else if (videoNumber === 4) {
            return 'fourth';
        }
        else if (videoNumber === 5) {
            return 'fifth(optional)';
        }
        else {
            return '';
        }
    };

    const getProgressValue = () => {
        if (showQuiz) {
            return Object.keys(answers).length;
        }
        else {
            return (videoNumber - 1) * 25;
        }
    }

    const handleTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime);
    };

    const handleVideoEnd = () => {
        console.log('Video Ended.....');
        if (videoNumber === 5) {
            setShowQuiz(true);
        }
        else {
            setVideoNumber(videoNumber + 1);
        }
    };

    const handleOptionChange = (questionId, selectedOption) => {
        setAnswers({ ...answers, [questionId]: selectedOption });
    };

    const handleSubmit = async () => {
        let score = 0;
        quizData.forEach((question) => {
            if (answers[question.id] === question.correctAnswer) {
                score += 1;
            }
        });
        console.log('Score: ', score);
        const percentage = (score / 15) * 100;
        console.log('Percentage: ', percentage);
        if (percentage >= 60) {
            const userData = JSON.parse(Cookies.get('userData'));
            const data = {
                id: userData._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                score,
                totalScore: 15,
                percentage,
            }
            setCertificateData(data);
            const res = await axios.post('http://localhost:4000/stripe/create-certificate', data);
            if (res.status === 200) {
                setShowCertificate(true);
            }
        }
        else {
            console.log('Below 60%');
            setQuizFailed(true);
        }
    };

    const togglePreview = () => {
        setPreview(!preview);
    };

    return (
        <>
            {userPaymentCompleted ?
                <>
                    {showQuiz ?
                        <div className='course-quiz'>
                            {quizFailed ?
                                <>
                                    <h1 style={{ textAlign: 'center' }}>Quiz Failed!</h1>
                                    <div className='quiz-failed'>We are really sorry that you wern't able to pass this quiz to get certificate. Please try again and we wish you very best of luck!</div>
                                </>
                                : showCertificate ?
                                    <div className='certificate'>
                                        <h1>Food Safety Certificate</h1>
                                        <PDFDownloadLink document={<PDF userData={certificateData} />} fileName="Food Safety Certificate.pdf">
                                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now')}
                                        </PDFDownloadLink>
                                        <button onClick={togglePreview}>{!preview ? 'Preview Certificate' : 'Hide Preview'}</button>
                                        {preview &&
                                            <PDFViewer style={{ width: '100%', height: '80vh' }}>
                                                <PDF userData={certificateData} />
                                            </PDFViewer>
                                        }
                                    </div>
                                    :
                                    <>
                                        <h1 className='title'>Quiz Section</h1>
                                        <div className='para-1'><b>Please fill out this quiz and score at least 60% to get Cerificate.</b></div>
                                        <div className='progress-bar-div'>
                                            <label className='progress-bar-label'>
                                                Progress: <progress value={`${getProgressValue()}`} max="15" className='progress-bar' />
                                            </label>
                                        </div>
                                        {quizData.map((question) => (
                                            <div className='question-container' key={question.id}>
                                                <p className='question'>{question.id + ')'}{question.question}</p>
                                                <div className='options-container'>
                                                    {question.options.map((option) => (
                                                        <div key={option} className='option'>
                                                            <input
                                                                type="radio"
                                                                id={`${question.id}-${option}`}
                                                                name={`question-${question.id}`}
                                                                value={option}
                                                                onChange={() => handleOptionChange(question.id, option)}
                                                            />
                                                            <label htmlFor={`${question.id}-${option}`}>{option}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        <div className='submit-btn-container'>
                                            <button className='submit-btn' onClick={handleSubmit}>Submit Quiz</button>
                                        </div>
                                    </>
                            }
                        </div>
                        :
                        <div className='course-video'>
                            <h1>Thanks for your payment!</h1>
                            <h1 className='title'>Videos Section</h1>
                            <div className='para-1'><b>Please watch these videos to move on to next quiz section.</b></div>
                            <div className='progress-bar-div'>
                                <label className='progress-bar-label'>
                                    Progress: <progress value={`${getProgressValue()}`} max="100" className='progress-bar' />
                                </label>
                            </div>
                            <div className='para'>Here is your {`${getVideoNumber()}`} course video for food safety so kindly watch it carefully.</div>
                            {videoNumber === 5 && <div className='para optional-para' onClick={handleVideoEnd}>You can skip this video by pressing skip button to move into next step. <BiSolidSkipNextCircle className="skip-btn" /></div>}
                            {videoNumber !== 0 &&
                                <video
                                    key={videoNumber}
                                    className='video'
                                    controls
                                    width="640"
                                    height="360"
                                    onTimeUpdate={handleTimeUpdate}
                                    onEnded={handleVideoEnd}
                                >
                                    <source
                                        src={
                                            `${videoNumber === 1 ? videoUrl1 :
                                                videoNumber === 2 ? videoUrl2 :
                                                    videoNumber === 3 ? videoUrl3 :
                                                        videoNumber === 4 ? videoUrl4 :
                                                            videoNumber === 5 ? videoUrl5 :
                                                                ''}`
                                        }
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            }
                        </div>
                    }
                </>
                :
                <div className='unauthorized-container'>
                    <div>
                        <h2 className='status'>401</h2>
                        <h2 className='text'>Unauthorized User</h2>
                    </div>
                </div>
            }
        </>
    );
};
