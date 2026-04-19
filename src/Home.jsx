import { useState, useEffect } from 'react'
import { 
  FiDownload, 
  FiPlayCircle, 
  FiCheckCircle, 
  FiZap, 
  FiShield, 
  FiSmartphone,
  FiVideo,
  FiImage,
  FiMusic
} from 'react-icons/fi'

function Home() {
  const [activeTab, setActiveTab] = useState('youtube')
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const root = document.documentElement;
    if (activeTab === 'youtube') {
      root.style.setProperty('--accent-primary', '#ef4444');
      root.style.setProperty('--accent-secondary', '#dc2626');
    } else if (activeTab === 'instagram') {
      root.style.setProperty('--accent-primary', '#f09433');
      root.style.setProperty('--accent-secondary', '#bc1888');
    } else if (activeTab === 'tiktok') {
      root.style.setProperty('--accent-primary', '#00f2fe');
      root.style.setProperty('--accent-secondary', '#fa709a');
    }
  }, [activeTab]);

  const handleDownload = async (e) => {
    e.preventDefault()
    if (!url) {
      setError('Please paste a valid video link first')
      return
    }

    setError('')
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch video details');
      }
      
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the video. Make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  }

  const getPlaceholder = () => {
    if (activeTab === 'youtube') return 'Paste YouTube link (e.g., https://youtube.com/watch...)'
    if (activeTab === 'instagram') return 'Paste Instagram Reel or Post link...'
    if (activeTab === 'tiktok') return 'Paste TikTok video link...'
    return 'Paste video link here...'
  }

  return (
    <>
      <main className="hero">
        <h1 className="heading-primary">
          Download <span style={{textTransform: 'capitalize'}}>{activeTab}</span> <br/>
          <span className="text-gradient">in Seconds.</span>
        </h1>
        <p className="text-lead">
          Save your favorite videos straight to your gallery in the highest quality possible. Fast, free, and secure. 
        </p>

        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'youtube' ? 'active' : ''}`}
            onClick={() => { setActiveTab('youtube'); setUrl(''); setResult(null); setError(''); }}
          >
            <FiVideo /> YouTube
          </button>
          <button 
            className={`tab-btn ${activeTab === 'instagram' ? 'active' : ''}`}
            onClick={() => { setActiveTab('instagram'); setUrl(''); setResult(null); setError(''); }}
          >
            <FiImage /> Instagram
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tiktok' ? 'active' : ''}`}
            onClick={() => { setActiveTab('tiktok'); setUrl(''); setResult(null); setError(''); }}
          >
            <FiMusic /> TikTok
          </button>
        </div>

        <form className="downloader-box glass-panel" onSubmit={handleDownload}>
          <div className="input-wrapper">
            <input 
              type="text" 
              className="url-input" 
              placeholder={getPlaceholder()} 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button 
              type="submit" 
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Extracting...
                </>
              ) : (
                <>
                  <FiZap /> Fetch Video
                </>
              )}
            </button>
          </div>
          
          {error && <div style={{ color: '#ef4444', marginTop: '1rem', fontWeight: 500 }}>{error}</div>}

          {result && (
            <div className="result-container">
              <div className={`video-thumbnail-wrapper ${result.platform === 'youtube' ? 'desktop-ratio' : ''}`}>
                <img src={result.thumbnail} alt={result.title} className="video-thumbnail" />
                <div className="play-icon-overlay">
                  <FiPlayCircle size={32} />
                </div>
              </div>
              
              <div className="video-details">
                <div className={`platform-badge ${result.platform}`}>
                  <span style={{textTransform: 'capitalize'}}>{result.platform} Video</span>
                </div>
                
                <h2 className="video-title">{result.title}</h2>
                
                <div className="video-meta">
                  <div className="meta-item"><FiPlayCircle /> {result.duration}</div>
                  <div className="meta-item"><FiZap /> {result.size}</div>
                  <div className="meta-item"><FiCheckCircle /> Secure</div>
                </div>

                <div className="download-options">
                  <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Available Formats
                  </h3>
                  {result.formats.map((format) => (
                    <a 
                      href={`/api/download?url=${encodeURIComponent(format.url)}&title=${encodeURIComponent(result.title)}`} 
                      className="btn-download" 
                      key={format.id} 
                    >
                      <div>
                        <strong>{format.quality}</strong>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                          .{format.ext}
                        </span>
                      </div>
                      <FiDownload size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>
      </main>

      <section className="features">
        <div className="feature-card glass-panel">
          <div className="feature-icon"><FiZap /></div>
          <h3 className="feature-title">Lightning Fast</h3>
          <p className="feature-desc">Our servers process the video instantly, providing you direct download links with zero wait time.</p>
        </div>
        <div className="feature-card glass-panel">
          <div className="feature-icon"><FiSmartphone /></div>
          <h3 className="feature-title">Universal Format</h3>
          <p className="feature-desc">Download MP4 files that open gracefully on iOS, Android, macOS, and Windows.</p>
        </div>
        <div className="feature-card glass-panel">
          <div className="feature-icon"><FiShield /></div>
          <h3 className="feature-title">100% Free & Secure</h3>
          <p className="feature-desc">No login walls, no tracking. Ensure your privacy while safely backing up your favorite content.</p>
        </div>
      </section>

      {/* FAQ Section added for SEO / AdSense requirements */}
      <section className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        
        <div className="faq-item">
          <h3 className="faq-q">Is FastVD completely free to use?</h3>
          <p className="faq-a">Yes! FastVD is a 100% free tool. You can download as many videos as you'd like without ever paying a dime or creating an account.</p>
        </div>
        
        <div className="faq-item">
          <h3 className="faq-q">Where are the videos saved on my phone?</h3>
          <p className="faq-a">If you are using an iPhone, tap "Download" and the video will be saved directly to your Files app, or you can choose to save it to your Camera Roll. On Android, videos are typically saved straight to your Gallery or Downloads folder.</p>
        </div>
        
        <div className="faq-item">
          <h3 className="faq-q">Do you store my downloaded videos?</h3>
          <p className="faq-a">Absolutely not! FastVD acts strictly as a direct proxy. We don't host, store, or log any of the content you download. All downloads are directly connected between you and the original platform.</p>
        </div>
        
        <div className="faq-item">
          <h3 className="faq-q">Can I download private Instagram Reels?</h3>
          <p className="faq-a">No. Out of respect for user privacy and platform security, our tool can only fetch publicly available videos that anyone could view on the internet.</p>
        </div>
      </section>
    </>
  )
}

export default Home
