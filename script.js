// Класс для управления игровой галереей
class GameGallery {
    constructor() {
        this.games = [
            {
                id: 1,
                title: "Cyber Runner 2077",
                genre: "Экшен",
                rating: 4.8,
                description: "Захватывающая киберпанк-игра в открытом мире с невероятной графикой и сюжетом.",
                players: 12500,
                time: 156,
                level: 85,
                videoSrc: "Cyber runner 2077.mp4", // Исправлено: путь как строка
                badge: "НОВАЯ"
            },
            {
                id: 2,
                title: "Space Odyssey",
                genre: "RPG",
                rating: 4.6,
                description: "Исследуйте бескрайние просторы космоса и открывайте новые цивилизации.",
                players: 8900,
                time: 203,
                level: 92,
                videoSrc: "Space odyssey.mp4",
                badge: "ПОПУЛЯРНАЯ"
            },
            {
                id: 3,
                title: "Neon Racing",
                genre: "Гонки",
                rating: 4.7,
                description: "Гонки будущего с неоновыми трассами и уникальными транспортными средствами.",
                players: 15600,
                time: 89,
                level: 78,
                videoSrc: "Neon Racing.mp4",
                badge: "ХИТ"
            },
            {
                id: 4,
                title: "Dragon's Legacy",
                genre: "RPG",
                rating: 4.9,
                description: "Эпическая фэнтези-сага с глубоким сюжетом и захватывающими битвами.",
                players: 23400,
                time: 312,
                level: 95,
                videoSrc: "Dragon's Legacy.mp4",
                badge: "ЛУЧШАЯ"
            },
            {
                id: 5,
                title: "Future Wars",
                genre: "Стратегии",
                rating: 4.5,
                description: "Стратегия будущего с тактическими боями и развитой экономикой.",
                players: 6700,
                time: 145,
                level: 82,
                videoSrc: "Future Wars.mp4",
                badge: "НОВАЯ"
            },
            {
                id: 6,
                title: "Virtual Reality",
                genre: "Экшен",
                rating: 4.4,
                description: "Погрузитесь в виртуальную реальность с невероятными приключениями.",
                players: 9800,
                time: 167,
                level: 88,
                videoSrc: "Virtual Reality.mp4",
                badge: "VR"
            }
        ];
        
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderGames();
        this.animateStats();
        this.createParticles();
    }

    setupEventListeners() {
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.textContent.toLowerCase();
                this.renderGames();
            });
        });

        document.querySelector('.close-btn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('game-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('game-modal')) {
                this.closeModal();
            }
        });

        document.querySelector('.btn-primary').addEventListener('click', () => {
            this.showNotification('Запускаем игру...', 'success');
        });

        document.querySelector('.btn-secondary').addEventListener('click', () => {
            this.scrollToGames();
        });
    }

    renderGames() {
        const container = document.querySelector('.games-grid');
        const filteredGames = this.currentFilter === 'all' 
            ? this.games 
            : this.games.filter(game => {
                const genreMap = {
                    'экшен': 'Экшен',
                    'rpg': 'RPG',
                    'стратегии': 'Стратегии',
                    'гонки': 'Гонки'
                };
                return game.genre.toLowerCase() === this.currentFilter || 
                       game.genre === genreMap[this.currentFilter];
            });

        container.innerHTML = filteredGames.map(game => this.createGameCard(game)).join('');
        
        filteredGames.forEach(game => {
            const card = document.querySelector(`[data-game-id="${game.id}"]`);
            if (card) {
                card.addEventListener('click', () => this.openGameModal(game));
            }
        });
    }

    createGameCard(game) {
        return `
            <div class="game-card" data-game-id="${game.id}">
                <div class="game-image">
                    <video src="${game.videoSrc}" autoplay muted loop playsinline class="card-video-bg"></video>
                    <div class="game-badge">${game.badge}</div>
                </div>
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <div class="game-meta">
                        <span class="game-genre">${game.genre}</span>
                        <span class="game-rating">
                            <i class="fas fa-star"></i> ${game.rating}
                        </span>
                    </div>
                    <p class="game-description">${game.description}</p>
                    <div class="game-stats">
                        <div class="stat">
                            <span class="stat-value">${this.formatNumber(game.players)}</span>
                            <span class="stat-label">Игроков</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${game.time}ч</span>
                            <span class="stat-label">Время</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${game.level}%</span>
                            <span class="stat-label">Прогресс</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    openGameModal(game) {
        const modal = document.getElementById('game-modal');
        const modalContent = modal.querySelector('.modal-content');
        
        document.getElementById('modal-game-title').textContent = game.title;
        document.getElementById('modal-game-genre').textContent = game.genre;
        document.getElementById('modal-game-rating').innerHTML = `<i class="fas fa-star"></i> ${game.rating}`;
        document.getElementById('modal-game-description').textContent = game.description;
        document.getElementById('modal-game-players').textContent = this.formatNumber(game.players);
        document.getElementById('modal-game-time').textContent = game.time;
        document.getElementById('modal-game-level').textContent = game.level;
        
        const modalImageContainer = modal.querySelector('.modal-game-image');
        // Заменяем фон в модалке на видео
        modalImageContainer.innerHTML = `
            <video src="${game.videoSrc}" autoplay muted loop playsinline 
                   style="width:100%; height:100%; object-fit:cover;"></video>
        `;
        
        modal.style.display = 'block';
        modalContent.style.animation = 'none';
        setTimeout(() => {
            modalContent.style.animation = 'modalAppear 0.3s ease';
        }, 10);
    }

    closeModal() {
        const modal = document.getElementById('game-modal');
        // Очищаем видео при закрытии, чтобы не грузить систему
        modal.querySelector('.modal-game-image').innerHTML = '';
        modal.style.display = 'none';
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (!target) return;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = this.formatNumber(Math.floor(current));
            }, 16);
        });
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if(!particlesContainer) return;
        
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #6b8dff;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
                opacity: ${0.3 + Math.random() * 0.7};
            `;
            particlesContainer.appendChild(particle);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
            }
            .card-video-bg {
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
            }
        `;
        document.head.appendChild(style);
    }

    formatNumber(num) {
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification?.remove(), 3000);
    }

    scrollToGames() {
        document.querySelector('.games-section').scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GameGallery();
});

const globalStyles = document.createElement('style');
globalStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .notification button {
        background: none; border: none; color: white;
        font-size: 1.2rem; cursor: pointer; display: flex;
    }
`;
document.head.appendChild(globalStyles);