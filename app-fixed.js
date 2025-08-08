// === EXAMMASTER APPLICATION - FIXED TAB FUNCTIONALITY ===
// Sample question bank with 20 questions
const questionBank = [
    {
        id: 1,
        question: "What is the correct way to create a functional component in React?",
        options: [
            "function MyComponent() { return <div>Hello</div>; }",
            "class MyComponent extends Component { render() { return <div>Hello</div>; } }",
            "const MyComponent = React.createComponent(() => <div>Hello</div>);",
            "React.component('MyComponent', () => <div>Hello</div>);"
        ],
        correctAnswer: 0,
        category: "React"
    },
    {
        id: 2,
        question: "Which HTTP method is used to create a new resource in REST API?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: 1,
        category: "Backend"
    },
    {
        id: 3,
        question: "What does JWT stand for?",
        options: ["JavaScript Web Token", "JSON Web Token", "Java Web Technology", "JavaScript Web Technology"],
        correctAnswer: 1,
        category: "Authentication"
    },
    {
        id: 4,
        question: "Which hook is used for side effects in React?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: 1,
        category: "React"
    },
    {
        id: 5,
        question: "What is the default port for MongoDB?",
        options: ["3000", "5432", "27017", "8080"],
        correctAnswer: 2,
        category: "Database"
    },
    {
        id: 6,
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0,
        category: "JavaScript"
    },
    {
        id: 7,
        question: "What is the purpose of Express.js?",
        options: ["Database management", "Web application framework for Node.js", "Frontend library", "Testing framework"],
        correctAnswer: 1,
        category: "Backend"
    },
    {
        id: 8,
        question: "Which command is used to initialize a new Node.js project?",
        options: ["node init", "npm start", "npm init", "node create"],
        correctAnswer: 2,
        category: "Node.js"
    },
    {
        id: 9,
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 1,
        category: "Frontend"
    },
    {
        id: 10,
        question: "Which operator is used for strict equality in JavaScript?",
        options: ["==", "===", "=", "!="],
        correctAnswer: 1,
        category: "JavaScript"
    },
    {
        id: 11,
        question: "What is the correct way to import React?",
        options: ["import React from 'react';", "import { React } from 'react';", "const React = require('react');", "Both A and C"],
        correctAnswer: 3,
        category: "React"
    },
    {
        id: 12,
        question: "Which status code indicates a successful HTTP request?",
        options: ["404", "500", "200", "401"],
        correctAnswer: 2,
        category: "Backend"
    },
    {
        id: 13,
        question: "What is the purpose of the useState hook in React?",
        options: ["To manage component state", "To handle side effects", "To create context", "To optimize performance"],
        correctAnswer: 0,
        category: "React"
    },
    {
        id: 14,
        question: "Which database is commonly used with the MEAN stack?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        correctAnswer: 2,
        category: "Database"
    },
    {
        id: 15,
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Programming Interface", "Application Protocol Interface", "Automated Programming Interface"],
        correctAnswer: 0,
        category: "Backend"
    },
    {
        id: 16,
        question: "Which method is used to convert JSON string to JavaScript object?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"],
        correctAnswer: 1,
        category: "JavaScript"
    },
    {
        id: 17,
        question: "What is the correct syntax for creating a class component in React?",
        options: ["class MyComponent extends React.Component", "class MyComponent implements React.Component", "function MyComponent() extends Component", "const MyComponent = class extends Component"],
        correctAnswer: 0,
        category: "React"
    },
    {
        id: 18,
        question: "Which HTTP status code indicates 'Not Found'?",
        options: ["500", "401", "404", "403"],
        correctAnswer: 2,
        category: "Backend"
    },
    {
        id: 19,
        question: "What is the purpose of middleware in Express.js?",
        options: ["To handle database connections", "To execute code between request and response", "To create routes", "To serve static files"],
        correctAnswer: 1,
        category: "Backend"
    },
    {
        id: 20,
        question: "Which method is used to remove the last element from an array in JavaScript?",
        options: ["pop()", "push()", "shift()", "splice()"],
        correctAnswer: 0,
        category: "JavaScript"
    }
];

// === APPLICATION STATE ===
class ExamApp {
    constructor() {
        this.currentUser = null;
        this.authToken = null;
        this.examData = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.timeRemaining = 1800; // 30 minutes in seconds
        this.timerInterval = null;
        this.questions = [];

        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthStatus();
        console.log('ExamApp initialized successfully');
    }

    // === AUTHENTICATION METHODS ===
    checkAuthStatus() {
        const token = localStorage.getItem('examToken');
        const user = localStorage.getItem('examUser');

        if (token && user) {
            this.authToken = token;
            this.currentUser = JSON.parse(user);
            this.showDashboard();
        } else {
            this.showLandingPage();
        }
    }

    async register(name, email, password) {
        try {
            // Simulate API call
            await this.delay(1000);

            // Check if user already exists
            const existingUsers = JSON.parse(localStorage.getItem('examUsers') || '[]');
            const userExists = existingUsers.find(u => u.email === email);

            if (userExists) {
                throw new Error('User with this email already exists');
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password, // In production, this would be hashed
                createdAt: new Date().toISOString()
            };

            existingUsers.push(newUser);
            localStorage.setItem('examUsers', JSON.stringify(existingUsers));

            // Auto-login after registration
            return await this.login(email, password);
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            // Simulate API call
            await this.delay(1000);

            // Check credentials
            const existingUsers = JSON.parse(localStorage.getItem('examUsers') || '[]');
            const user = existingUsers.find(u => u.email === email && u.password === password);

            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Generate JWT token (simulated)
            const token = this.generateJWT(user);

            // Store auth data
            this.authToken = token;
            this.currentUser = user;
            localStorage.setItem('examToken', token);
            localStorage.setItem('examUser', JSON.stringify(user));

            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    logout() {
        this.authToken = null;
        this.currentUser = null;
        this.examData = null;
        this.questions = [];
        this.userAnswers = {};
        this.currentQuestionIndex = 0;
        this.clearTimer();

        localStorage.removeItem('examToken');
        localStorage.removeItem('examUser');
        localStorage.removeItem('currentExam');

        this.showLandingPage();
    }

    generateJWT(user) {
        // Simulated JWT generation
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            sub: user.id,
            name: user.name,
            email: user.email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        }));
        const signature = btoa('simulated-signature');
        return `${header}.${payload}.${signature}`;
    }

    // === EXAM METHODS ===
    async startExam() {
        try {
            // Load questions
            this.questions = this.getRandomizedQuestions();
            this.currentQuestionIndex = 0;
            this.userAnswers = {};
            this.timeRemaining = 1800; // Reset timer

            // Create exam session
            this.examData = {
                id: Date.now().toString(),
                userId: this.currentUser.id,
                questions: this.questions,
                startTime: new Date().toISOString(),
                timeLimit: 1800
            };

            localStorage.setItem('currentExam', JSON.stringify(this.examData));

            this.showExamPage();
            this.displayQuestion();
            this.startTimer();
        } catch (error) {
            console.error('Error starting exam:', error);
            alert('Failed to start exam. Please try again.');
        }
    }

    getRandomizedQuestions() {
        // Shuffle questions and take 12
        const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 12);
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const questionCard = document.getElementById('question-card');

        // Update progress
        document.getElementById('progress-text').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        document.getElementById('progress-percentage').textContent = 
            `${Math.round((this.currentQuestionIndex + 1) / this.questions.length * 100)}%`;
        document.getElementById('progress-fill').style.width = 
            `${(this.currentQuestionIndex + 1) / this.questions.length * 100}%`;

        // Update question content
        document.getElementById('question-text').textContent = question.question;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option-item';
            if (this.userAnswers[question.id] === index) {
                optionElement.classList.add('selected');
            }

            optionElement.innerHTML = `
                <input type="radio" name="question-${question.id}" value="${index}" class="option-radio" 
                       ${this.userAnswers[question.id] === index ? 'checked' : ''}>
                <span class="option-text">${String.fromCharCode(65 + index)}. ${option}</span>
            `;

            optionElement.addEventListener('click', () => {
                this.selectAnswer(question.id, index);
            });

            optionsContainer.appendChild(optionElement);
        });

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = this.currentQuestionIndex === 0;

        const nextBtn = document.getElementById('next-btn');
        const finishBtn = document.getElementById('finish-exam-btn');

        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.classList.add('hidden');
            finishBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            finishBtn.classList.add('hidden');
        }

        // Add animation
        questionCard.classList.remove('slide-in');
        setTimeout(() => questionCard.classList.add('slide-in'), 10);
    }

    selectAnswer(questionId, answerIndex) {
        this.userAnswers[questionId] = answerIndex;

        // Update UI
        const optionItems = document.querySelectorAll('.option-item');
        optionItems.forEach((item, index) => {
            const radio = item.querySelector('input[type="radio"]');
            if (index === answerIndex) {
                item.classList.add('selected');
                radio.checked = true;
            } else {
                item.classList.remove('selected');
                radio.checked = false;
            }
        });

        // Save to localStorage
        const examData = JSON.parse(localStorage.getItem('currentExam') || '{}');
        examData.userAnswers = this.userAnswers;
        localStorage.setItem('currentExam', JSON.stringify(examData));
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    async submitExam() {
        try {
            this.clearTimer();

            // Calculate score
            let correctAnswers = 0;
            this.questions.forEach(question => {
                if (this.userAnswers[question.id] === question.correctAnswer) {
                    correctAnswers++;
                }
            });

            const totalQuestions = this.questions.length;
            const percentage = Math.round((correctAnswers / totalQuestions) * 100);
            const passed = percentage >= 60;

            // Create result data
            const resultData = {
                examId: this.examData.id,
                userId: this.currentUser.id,
                score: correctAnswers,
                totalQuestions: totalQuestions,
                percentage: percentage,
                passed: passed,
                answers: this.userAnswers,
                submittedAt: new Date().toISOString(),
                timeSpent: 1800 - this.timeRemaining
            };

            // Save result
            const existingResults = JSON.parse(localStorage.getItem('examResults') || '[]');
            existingResults.push(resultData);
            localStorage.setItem('examResults', JSON.stringify(existingResults));

            // Clear current exam
            localStorage.removeItem('currentExam');

            this.showResults(resultData);
        } catch (error) {
            console.error('Error submitting exam:', error);
            alert('Failed to submit exam. Please try again.');
        }
    }

    // === TIMER METHODS ===
    startTimer() {
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();

            if (this.timeRemaining <= 0) {
                this.submitExam(); // Auto-submit when time expires
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const timeText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const timerDisplay = document.getElementById('timer-display');
        const timerText = document.getElementById('timer-text');

        if (timerText) {
            timerText.textContent = timeText;
        }

        // Change color based on remaining time
        if (timerDisplay) {
            if (this.timeRemaining <= 300) { // 5 minutes
                timerDisplay.className = 'timer-display critical';
            } else if (this.timeRemaining <= 600) { // 10 minutes
                timerDisplay.className = 'timer-display warning';
            } else {
                timerDisplay.className = 'timer-display';
            }
        }
    }

    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    // === UI METHODS ===
    showLandingPage() {
        this.hideAllPages();
        document.getElementById('landing-page').classList.remove('hidden');
        // Ensure login form is shown by default
        this.switchToLogin();
    }

    showDashboard() {
        this.hideAllPages();
        document.getElementById('dashboard-page').classList.remove('hidden');
    }

    showExamPage() {
        this.hideAllPages();
        document.getElementById('exam-page').classList.remove('hidden');
    }

    showResults(resultData) {
        this.hideAllPages();

        // Update result display
        const resultTitle = document.getElementById('result-title');
        const resultMessage = document.getElementById('result-message');

        if (resultData.passed) {
            resultTitle.textContent = '🎉 Congratulations!';
            resultTitle.className = 'result-title passed';
            resultMessage.innerHTML = `
                <h3 style="color: var(--color-success); margin-bottom: 1rem;">Excellent Work!</h3>
                <p>You have successfully passed the ExamMaster assessment with a score of ${resultData.percentage}%. This demonstrates your strong understanding of the subject matter.</p>
            `;
        } else {
            resultTitle.textContent = 'Keep Learning!';
            resultTitle.className = 'result-title failed';
            resultMessage.innerHTML = `
                <h3 style="color: var(--color-warning); margin-bottom: 1rem;">Good Effort!</h3>
                <p>You scored ${resultData.percentage}%, which is below the passing threshold of 60%. Don't worry - this is a great learning opportunity. Review the topics and try again!</p>
            `;
        }

        document.getElementById('score-value').textContent = `${resultData.score}/${resultData.totalQuestions}`;
        document.getElementById('percentage-value').textContent = `${resultData.percentage}%`;
        document.getElementById('correct-value').textContent = resultData.score;
        document.getElementById('incorrect-value').textContent = resultData.totalQuestions - resultData.score;

        document.getElementById('results-page').classList.remove('hidden');
    }

    hideAllPages() {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });
    }

    // === ENHANCED TAB SWITCHING METHODS ===
    switchToLogin() {
        console.log('Switching to login form');

        // Update tab buttons
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (loginTab) loginTab.classList.add('active');
        if (registerTab) registerTab.classList.remove('active');

        // Switch forms with animation
        if (registerForm) {
            registerForm.style.display = 'none';
            registerForm.classList.remove('active');
        }

        if (loginForm) {
            setTimeout(() => {
                loginForm.style.display = 'block';
                loginForm.classList.add('active');
            }, 100);
        }

        this.clearErrors();
        console.log('Login form should now be visible');
    }

    switchToRegister() {
        console.log('Switching to register form');

        // Update tab buttons
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (registerTab) registerTab.classList.add('active');
        if (loginTab) loginTab.classList.remove('active');

        // Switch forms with animation
        if (loginForm) {
            loginForm.style.display = 'none';
            loginForm.classList.remove('active');
        }

        if (registerForm) {
            setTimeout(() => {
                registerForm.style.display = 'block';
                registerForm.classList.add('active');
            }, 100);
        }

        this.clearErrors();
        console.log('Register form should now be visible');
    }

    // === EVENT BINDING ===
    bindEvents() {
        // Auth tab switching with enhanced debugging
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');

        if (loginTab) {
            loginTab.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Login tab clicked');
                this.switchToLogin();
            });
        }

        if (registerTab) {
            registerTab.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Register tab clicked');
                this.switchToRegister();
            });
        }

        // Form submissions
        const loginFormElement = document.getElementById('login-form-element');
        const registerFormElement = document.getElementById('register-form-element');

        if (loginFormElement) {
            loginFormElement.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        if (registerFormElement) {
            registerFormElement.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // Dashboard actions
        const startExamBtn = document.getElementById('start-exam-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (startExamBtn) {
            startExamBtn.addEventListener('click', () => {
                this.startExam();
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // Exam navigation
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const finishExamBtn = document.getElementById('finish-exam-btn');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextQuestion();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevQuestion();
            });
        }

        if (finishExamBtn) {
            finishExamBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to submit your exam? This action cannot be undone.')) {
                    this.submitExam();
                }
            });
        }

        // Result actions
        const newExamBtn = document.getElementById('new-exam-btn');
        const dashboardBtn = document.getElementById('dashboard-btn');
        const finalLogoutBtn = document.getElementById('final-logout-btn');

        if (newExamBtn) {
            newExamBtn.addEventListener('click', () => {
                this.startExam();
            });
        }

        if (dashboardBtn) {
            dashboardBtn.addEventListener('click', () => {
                this.showDashboard();
            });
        }

        if (finalLogoutBtn) {
            finalLogoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        console.log('All event listeners bound successfully');
    }

    async handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const submitBtn = document.getElementById('login-submit');

        // Validation
        this.clearErrors();
        let hasErrors = false;

        if (!email) {
            this.showError('login-email-error', 'Email is required');
            hasErrors = true;
        }

        if (!password) {
            this.showError('login-password-error', 'Password is required');
            hasErrors = true;
        }

        if (hasErrors) return;

        try {
            this.setButtonLoading(submitBtn, true);
            await this.login(email, password);
            this.showDashboard();
        } catch (error) {
            this.showError('login-password-error', error.message);
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }

    async handleRegister() {
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const submitBtn = document.getElementById('register-submit');

        // Validation
        this.clearErrors();
        let hasErrors = false;

        if (!name) {
            this.showError('register-name-error', 'Full name is required');
            hasErrors = true;
        }

        if (!email) {
            this.showError('register-email-error', 'Email is required');
            hasErrors = true;
        } else if (!this.isValidEmail(email)) {
            this.showError('register-email-error', 'Please enter a valid email address');
            hasErrors = true;
        }

        if (!password) {
            this.showError('register-password-error', 'Password is required');
            hasErrors = true;
        } else if (password.length < 6) {
            this.showError('register-password-error', 'Password must be at least 6 characters');
            hasErrors = true;
        }

        if (password !== confirmPassword) {
            this.showError('register-confirm-password-error', 'Passwords do not match');
            hasErrors = true;
        }

        if (hasErrors) return;

        try {
            this.setButtonLoading(submitBtn, true);
            await this.register(name, email, password);
            this.showDashboard();
        } catch (error) {
            this.showError('register-email-error', error.message);
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }

    // === UTILITY METHODS ===
    showError(elementId, message) {
        const element = document.getElementById(elementId);
        const input = element?.parentElement?.querySelector('.form-control');
        if (element) element.textContent = message;
        if (input) input.classList.add('error');
    }

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('.form-control').forEach(el => {
            el.classList.remove('error');
        });
    }

    setButtonLoading(button, loading) {
        if (!button) return;

        if (loading) {
            button.classList.add('btn--loading');
            button.disabled = true;
        } else {
            button.classList.remove('btn--loading');
            button.disabled = false;
        }
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// === INITIALIZE APPLICATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing ExamApp...');
    window.examApp = new ExamApp();
});

// === PREVENT CONTEXT MENU AND F12 (BASIC SECURITY) ===
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});