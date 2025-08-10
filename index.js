// Array of random dog thoughts
const workThoughts = [
    "Time to focus and be productive!",
    "Let's get this work done!",
    "Focus mode activated!",
    "I'll guard your productivity!",
    "Work hard, play later!",
    "Concentration is key!",
    "Let's chase those goals!",
    "Focus like a good dog!",
    "Time to earn some treats!",
    "Work session in progress!"
];

const breakThoughts = [
    "Time for a well-deserved break!",
    "Let's play and relax!",
    "Break time = treat time!",
    "Rest and recharge!",
    "Good work deserves good rest!",
    "Stretch those legs!",
    "Break time belly rubs?",
    "Time to chase some fun!",
    "Relax like a sleepy pup!",
    "Take a breather, good human!"
];

const idleThoughts = [
    "Ready when you are!",
    "Let's start being productive!",
    "I'm here to help you focus!",
    "Time to work together!",
    "Your faithful focus companion!",
    "Ready to earn some bones!",
    "Let's make today productive!",
    "Waiting for work commands!",
    "Ready to be your work buddy!",
    "Focus session awaiting!"
];

// Timer state
let timerState = {
    isRunning: false,
    isPaused: false,
    timeLeft: 25 * 60, // 25 minutes in seconds
    isWorkSession: true,
    completedSessions: 0,
    totalBones: 0,
    currentJarBones: 0,
    filledJars: 0
};

let timerInterval;
let boneInterval;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    changeThought();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('workTime').addEventListener('change', function() {
        if (!timerState.isRunning && timerState.isWorkSession) {
            timerState.timeLeft = parseInt(this.value) * 60;
            updateDisplay();
        }
    });

    document.getElementById('breakTime').addEventListener('change', function() {
        if (!timerState.isRunning && !timerState.isWorkSession) {
            timerState.timeLeft = parseInt(this.value) * 60;
            updateDisplay();
        }
    });

    // Auto-change thoughts every 8 seconds during idle
    setInterval(() => {
        if (!timerState.isRunning) {
            changeThought();
        }
    }, 8000);
}

function updateDisplay() {
    const minutes = Math.floor(timerState.timeLeft / 60);
    const seconds = timerState.timeLeft % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update progress bar
    const totalTime = timerState.isWorkSession ? 
        parseInt(document.getElementById('workTime').value) * 60 :
        parseInt(document.getElementById('breakTime').value) * 60;
    const progress = ((totalTime - timerState.timeLeft) / totalTime) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Update session info
    document.getElementById('sessionType').textContent = 
        timerState.isWorkSession ? 'Work Session' : 'Break Time';
    document.getElementById('completedSessions').textContent = timerState.completedSessions;
    
    // Update bone stats
    document.getElementById('filledJars').textContent = timerState.filledJars;
    document.getElementById('currentBones').textContent = timerState.currentJarBones;
}

function startTimer() {
    if (!timerState.isRunning) {
        timerState.isRunning = true;
        timerState.isPaused = false;
        
        // Start bone collection for work sessions
        if (timerState.isWorkSession) {
            startBoneCollection();
        }
        
        timerInterval = setInterval(() => {
            timerState.timeLeft--;
            updateDisplay();
            
            if (timerState.timeLeft <= 0) {
                completeSession();
            }
        }, 1000);
        
        updateThoughtForState();
    }
}

function pauseTimer() {
    if (timerState.isRunning && !timerState.isPaused) {
        timerState.isPaused = true;
        clearInterval(timerInterval);
        clearInterval(boneInterval);
        updateThoughtForState();
    } else if (timerState.isPaused) {
        timerState.isPaused = false;
        startTimer();
    }
}

function stopTimer() {
    timerState.isRunning = false;
    timerState.isPaused = false;
    clearInterval(timerInterval);
    clearInterval(boneInterval);
    
    // Reset to work session
    timerState.isWorkSession = true;
    timerState.timeLeft = parseInt(document.getElementById('workTime').value) * 60;
    
    updateDisplay();
    updateThoughtForState();
}

function completeSession() {
    clearInterval(timerInterval);
    clearInterval(boneInterval);
    
    if (timerState.isWorkSession) {
        timerState.completedSessions++;
        // Switch to break
        timerState.isWorkSession = false;
        timerState.timeLeft = parseInt(document.getElementById('breakTime').value) * 60;
    } else {
        // Switch back to work
        timerState.isWorkSession = true;
        timerState.timeLeft = parseInt(document.getElementById('workTime').value) * 60;
    }
    
    timerState.isRunning = false;
    updateDisplay();
    updateThoughtForState();
    
    // Play completion sound effect (visual feedback)
    if (timerState.isWorkSession) {
        changeThought("Break time! Good work!");
    } else {
        changeThought("Back to work! Let's focus!");
    }
}

function startBoneCollection() {
    const workTimeMinutes = parseInt(document.getElementById('workTime').value);
    const totalBones = workTimeMinutes; // 1 bone per minute
    const intervalTime = (workTimeMinutes * 60 * 1000) / totalBones; // Distribute over work session
    
    boneInterval = setInterval(() => {
        if (timerState.isRunning && !timerState.isPaused && timerState.isWorkSession) {
            addBone();
        }
    }, intervalTime);
}

function addBone() {
    const currentJarId = `bones-${timerState.filledJars}`;
    const currentJarElement = document.getElementById(currentJarId);
    
    if (!currentJarElement) return;
    
    // Create bone element
    const bone = document.createElement('div');
    bone.className = 'bone';
    bone.style.animationDelay = Math.random() * 0.3 + 's';
    
    // Add random rotation for variety
    const randomRotation = Math.random() * 30 - 15;
    bone.style.transform += ` rotate(${randomRotation}deg)`;
    
    currentJarElement.appendChild(bone);
    
    timerState.currentJarBones++;
    timerState.totalBones++;
    
    // Check if jar is full
    if (timerState.currentJarBones >= 25) {
        // Mark jar as full and add glow effect
        const jarElement = document.getElementById(`jar-${timerState.filledJars}`);
        jarElement.classList.add('full');
        
        // Create new jar after a short delay
        setTimeout(() => {
            createNewJar();
        }, 1000);
    }
    
    updateDisplay();
}

function createNewJar() {
    timerState.filledJars++;
    timerState.currentJarBones = 0;
    
    const jarsContainer = document.getElementById('jarsContainer');
    const newJar = document.createElement('div');
    newJar.className = 'jar';
    newJar.id = `jar-${timerState.filledJars}`;
    
    const jarBones = document.createElement('div');
    jarBones.className = 'jar-bones';
    jarBones.id = `bones-${timerState.filledJars}`;
    
    newJar.appendChild(jarBones);
    jarsContainer.appendChild(newJar);
    
    // Animate new jar appearance
    newJar.style.opacity = '0';
    newJar.style.transform = 'translateY(2vmax)';
    setTimeout(() => {
        newJar.style.transition = 'all 0.5s ease';
        newJar.style.opacity = '1';
        newJar.style.transform = 'translateY(0)';
    }, 100);
    
    updateDisplay();
}

function changeThought(customThought = null) {
    const thoughtText = document.getElementById('thoughtText');
    let thoughtArray;
    
    if (customThought) {
        thoughtText.style.opacity = '0';
        setTimeout(() => {
            thoughtText.textContent = customThought;
            thoughtText.style.opacity = '1';
        }, 200);
        return;
    }
    
    if (!timerState.isRunning) {
        thoughtArray = idleThoughts;
    } else if (timerState.isWorkSession) {
        thoughtArray = workThoughts;
    } else {
        thoughtArray = breakThoughts;
    }
    
    const randomThought = thoughtArray[Math.floor(Math.random() * thoughtArray.length)];
    
    thoughtText.style.opacity = '0';
    setTimeout(() => {
        thoughtText.textContent = randomThought;
        thoughtText.style.opacity = '1';
    }, 200);
}

function updateThoughtForState() {
    changeThought();
}

// Export functions for potential module usage
window.PomodoroTimer = {
    startTimer,
    pauseTimer,
    stopTimer,
    changeThought,
    getState: () => timerState
};
