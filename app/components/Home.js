// @flow
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import API from '../api/API';

function Home() {
    const fetchAndSpeak = async () => {
        try {
            const response = await API.get('/truyencv/nhan-ma-chi-lo/chuong-1');
            const { cleanedContent } = response.data.data;
            window.responsiveVoice.speak(cleanedContent, 'Vietnamese Female', { rate: 1.3 });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchAndSpeak();
        return () => {
            window.responsiveVoice.cancel();
            console.log('[Home] Will Unmount');
        };
    }, []);

    return (
        <div className={styles.container} data-tid="container">
            <h2>Home</h2>
            <Link to={routes.COUNTER}>to Counter</Link>
        </div>
    );
}

export default Home;
