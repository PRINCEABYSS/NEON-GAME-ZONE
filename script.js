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
        // Фильтрация игр
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.textContent.toLowerCase();
                this.renderGames();
            });
        });

        // Закрытие модального окна
        document.querySelector('.close-btn').addEventListener('click', () => {
            this.closeModal();
        });

        // Закрытие модального окна при клике вне его
        document.getElementById('game-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('game-modal')) {
                this.closeModal();
            }
        });

        // Кнопки в герое
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
        
        // Добавляем обработчики для карточек игр
        filteredGames.forEach(game => {
            const card = document.querySelector(`[data-game-id="${game.id}"]`);
            if (card) {
                card.addEventListener('click', () => this.openGameModal(game));
            }
        });
    }

    createGameCard(game) {
        const stars = '★'.repeat(Math.floor(game.rating)) + '☆'.repeat(5 - Math.floor(game.rating));
        
        return `
            <div class="game-card" data-game-id="${game.id}">
                <div class="game-image">
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
        
        // Заполняем модальное окно данными игры
        document.getElementById('modal-game-title').textContent = game.title;
        document.getElementById('modal-game-genre').textContent = game.genre;
        document.getElementById('modal-game-rating').innerHTML = `<i class="fas fa-star"></i> ${game.rating}`;
        document.getElementById('modal-game-description').textContent = game.description;
        document.getElementById('modal-game-players').textContent = this.formatNumber(game.players);
        document.getElementById('modal-game-time').textContent = game.time;
        document.getElementById('modal-game-level').textContent = game.level;
        
        // Устанавливаем цвет фона для изображения игры
        const modalImage = modal.querySelector('.modal-game-image');
        const colors = [
            'linear-gradient(45deg, #1a1a2e, #16213e)',
            'linear-gradient(45deg, #2d1a2e, #41163e)',
            'linear-gradient(45deg, #1a2e2a, #163e32)',
            'linear-gradient(45deg, #2e2a1a, #3e3216)'
        ];
        modalImage.style.background = colors[game.id % colors.length];
        
        modal.style.display = 'block';
        
        // Анимация появления
        modalContent.style.animation = 'none';
        setTimeout(() => {
            modalContent.style.animation = 'modalAppear 0.3s ease';
        }, 10);
    }

    closeModal() {
        document.getElementById('game-modal').style.display = 'none';
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
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
        
        // Добавляем стили для анимации частиц
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
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
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    scrollToGames() {
        document.querySelector('.games-section').scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new GameGallery();
});

// Добавляем глобальные стили для анимаций
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(globalStyles);