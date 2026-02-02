import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubPageHeader } from '../components/SubPageHeader';
import downloadAppStore from '../assets/img/app-store.png';
import downloadGooglePlay from '../assets/img/download-google-play-store-logo.png';
import movieWatchtScreenshot from '../assets/img/movieWatcht-screenshot.PNG';

const MovieWatcht = () => {
  useEffect(() => {
    document.title = 'Daniel | MovieWatcht';
  }, []);

  return (
    <div className='subpage'>
      <SubPageHeader />

      <div className='subpage-content'>
        <h1 className='subpage-title'>
          <span className='subpage-title__accent'>Movie</span>Watcht
          <span className='subpage-title__dot'>.</span>
        </h1>

        <div className='moviewatcht-screenshot'>
          <img src={movieWatchtScreenshot} alt='MovieWatcht app screenshot' />
        </div>

        <div className='subpage-text' style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>
            MovieWatcht is a movie and series information app powered by TMDb.
            Discover new movies and save them to your Watch List for easy tracking.
          </p>
        </div>

        <div className='moviewatcht-downloads'>
          <a href='https://apps.apple.com/us/app/moviewatcht/id1559449586'>
            <img src={downloadAppStore} alt='Download on App Store' />
          </a>
          <a href='https://play.google.com/store/apps/details?id=com.danieldjupvik.MovieWatcht&hl'>
            <img src={downloadGooglePlay} alt='Get it on Google Play' />
          </a>
        </div>

        <div className='subpage-footer'>
          <p>
            <Link to='/privacy'>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieWatcht;
