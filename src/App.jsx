import { useState, useEffect } from 'react'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentCat, setCurrentCat] = useState(null)
  const [banList, setBanList] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRandomCat = async () => {
    setLoading(true)
    setError(null)
    try {
      // Use API key for better access and more detailed information
      const headers = ACCESS_KEY ? {
        'x-api-key': ACCESS_KEY
      } : {}
      
      let catData = null
      
      if (ACCESS_KEY) {
        // Method 1: Get a random breed first, then get an image for that breed
        try {
          const breedsResponse = await fetch('https://api.thecatapi.com/v1/breeds', {
            headers
          })
          
          if (breedsResponse.ok) {
            const breeds = await breedsResponse.json()
            const randomBreed = breeds[Math.floor(Math.random() * breeds.length)]
            
            // Get an image for this specific breed
            const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${randomBreed.id}&limit=1`, {
              headers
            })
            
            if (imageResponse.ok) {
              const imageData = await imageResponse.json()
              
              if (imageData && imageData[0]) {
                catData = {
                  id: imageData[0].id,
                  image: imageData[0].url,
                  breed: randomBreed.name,
                  temperament: randomBreed.temperament,
                  origin: randomBreed.origin,
                  lifeSpan: randomBreed.life_span,
                  description: randomBreed.description,
                  weight: randomBreed.weight?.metric,
                  intelligence: randomBreed.intelligence,
                  adaptability: randomBreed.adaptability,
                  affectionLevel: randomBreed.affection_level,
                  childFriendly: randomBreed.child_friendly,
                  dogFriendly: randomBreed.dog_friendly,
                  energyLevel: randomBreed.energy_level,
                  grooming: randomBreed.grooming,
                  healthIssues: randomBreed.health_issues,
                  sheddingLevel: randomBreed.shedding_level,
                  socialNeeds: randomBreed.social_needs,
                  strangerFriendly: randomBreed.stranger_friendly,
                  vocalisation: randomBreed.vocalisation
                }
              }
            }
          }
        } catch (error) {
          console.log('Method 1 failed, trying fallback')
        }
      }
      
      // Method 2: Fallback to original method if Method 1 fails
      if (!catData) {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?include_breeds=true&limit=1', {
          headers
        })
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data && data[0]) {
          const cat = data[0]
          const breed = cat.breeds?.[0] || {}
          
          catData = {
            id: cat.id,
            image: cat.url,
            breed: breed.name || 'Mixed Breed',
            temperament: breed.temperament || 'Varies by individual',
            origin: breed.origin || 'Various origins',
            lifeSpan: breed.life_span || '12-18',
            description: breed.description || 'A beautiful cat with unique characteristics.',
            weight: breed.weight?.metric || '3-6',
            intelligence: breed.intelligence || '3',
            adaptability: breed.adaptability || '3',
            affectionLevel: breed.affection_level || '3',
            childFriendly: breed.child_friendly || '3',
            dogFriendly: breed.dog_friendly || '3',
            energyLevel: breed.energy_level || '3',
            grooming: breed.grooming || '3',
            healthIssues: breed.health_issues || '2',
            sheddingLevel: breed.shedding_level || '3',
            socialNeeds: breed.social_needs || '3',
            strangerFriendly: breed.stranger_friendly || '3',
            vocalisation: breed.vocalisation || '3'
          }
        }
      }
      
      if (catData) {
        // Check if any attributes are in the ban list
        const isBanned = banList.some(banned => 
          catData.breed === banned || 
          catData.temperament.includes(banned) ||
          catData.origin === banned
        )
        
        if (isBanned) {
          // If banned, fetch another cat
          fetchRandomCat()
          return
        }
        
        setCurrentCat(catData)
        setHistory(prev => [catData, ...prev.slice(0, 9)]) // Keep last 10 cats
      } else {
        throw new Error('No cat data received')
      }
    } catch (error) {
      console.error('Error fetching cat:', error)
      setError('Failed to fetch cat data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAttributeClick = (attribute) => {
    if (banList.includes(attribute)) {
      setBanList(prev => prev.filter(item => item !== attribute))
    } else {
      setBanList(prev => [...prev, attribute])
    }
  }

  const isAttributeBanned = (attribute) => {
    return banList.includes(attribute)
  }

  const clearHistory = () => {
    setHistory([])
  }

  const getRatingStars = (rating) => {
    if (!rating || rating === 'Unknown') return '⭐'
    const num = parseInt(rating)
    return '⭐'.repeat(Math.min(num, 5))
  }

  useEffect(() => {
    fetchRandomCat()
  }, [])

  return (
    <div className="app">
      <header>
        <h1>🐱 Discover Cats</h1>
        <p>Click "Discover" to find a random cat, or click on attributes to ban them!</p>
        {!ACCESS_KEY && (
          <p className="api-warning">
            ⚠️ No API key found. Add VITE_APP_ACCESS_KEY to your .env file for better access.
          </p>
        )}
      </header>

      <main>
        <div className="discover-section">
          <button 
            onClick={fetchRandomCat} 
            disabled={loading}
            className="discover-btn"
          >
            {loading ? 'Discovering...' : 'Discover Cat'}
          </button>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {currentCat && (
            <div className="cat-card">
              <img src={currentCat.image} alt={`${currentCat.breed} cat`} className="cat-image" />
              <div className="cat-info">
                <h2>{currentCat.breed}</h2>
                <p className="cat-description">{currentCat.description}</p>
                
                <div className="attributes">
                  <span 
                    className={`attribute ${isAttributeBanned(currentCat.breed) ? 'banned' : 'clickable'}`}
                    onClick={() => handleAttributeClick(currentCat.breed)}
                  >
                    <strong>Breed:</strong> {currentCat.breed}
                  </span>
                  <span 
                    className={`attribute ${isAttributeBanned(currentCat.temperament) ? 'banned' : 'clickable'}`}
                    onClick={() => handleAttributeClick(currentCat.temperament)}
                  >
                    <strong>Temperament:</strong> {currentCat.temperament}
                  </span>
                  <span 
                    className={`attribute ${isAttributeBanned(currentCat.origin) ? 'banned' : 'clickable'}`}
                    onClick={() => handleAttributeClick(currentCat.origin)}
                  >
                    <strong>Origin:</strong> {currentCat.origin}
                  </span>
                  <span className="attribute">
                    <strong>Life Span:</strong> {currentCat.lifeSpan} years
                  </span>
                  <span className="attribute">
                    <strong>Weight:</strong> {currentCat.weight} kg
                  </span>
                </div>

                <div className="cat-ratings">
                  <h3>Cat Ratings</h3>
                  <div className="ratings-grid">
                    <div className="rating-item">
                      <span>Intelligence:</span>
                      <span>{getRatingStars(currentCat.intelligence)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Adaptability:</span>
                      <span>{getRatingStars(currentCat.adaptability)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Affection Level:</span>
                      <span>{getRatingStars(currentCat.affectionLevel)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Child Friendly:</span>
                      <span>{getRatingStars(currentCat.childFriendly)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Dog Friendly:</span>
                      <span>{getRatingStars(currentCat.dogFriendly)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Energy Level:</span>
                      <span>{getRatingStars(currentCat.energyLevel)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Grooming:</span>
                      <span>{getRatingStars(currentCat.grooming)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Health Issues:</span>
                      <span>{getRatingStars(currentCat.healthIssues)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Shedding Level:</span>
                      <span>{getRatingStars(currentCat.sheddingLevel)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Social Needs:</span>
                      <span>{getRatingStars(currentCat.socialNeeds)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Stranger Friendly:</span>
                      <span>{getRatingStars(currentCat.strangerFriendly)}</span>
                    </div>
                    <div className="rating-item">
                      <span>Vocalisation:</span>
                      <span>{getRatingStars(currentCat.vocalisation)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {banList.length > 0 && (
          <div className="ban-list">
            <h3>🚫 Banned Attributes</h3>
            <div className="banned-items">
              {banList.map((item, index) => (
                <span 
                  key={index} 
                  className="banned-item clickable"
                  onClick={() => handleAttributeClick(item)}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="history">
            <div className="history-header">
              <h3>📚 Discovery History</h3>
              <button 
                onClick={clearHistory}
                className="clear-history-btn"
                title="Clear all history"
              >
                🗑️ Clear History
              </button>
            </div>
            <div className="history-grid">
              {history.map((cat, index) => (
                <div key={cat.id} className="history-item">
                  <img src={cat.image} alt={`${cat.breed} cat`} />
                  <p>{cat.breed}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
