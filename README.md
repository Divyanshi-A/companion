# Dog Pomodoro Timer
https://divyanshi-a.github.io/companion/
A functional Pomodoro timer featuring an animated dog companion that helps maintain focus during work sessions and collects bones as rewards.
but originally intended to be 
A cute and functional Pomodoro timer featuring an animated dog companion that helps me stay focused during work sessions and collects bones as rewards!
## Features

- Pomodoro Timer with customizable work and break intervals
- Animated dog with thought bubbles and animations
- Bone collection system for completed work sessions
- Visual progress tracking with session counter
- Responsive design for desktop and mobile
- Dynamic thoughts based on session state

## Quick Start

1. Open `index.html` in your web browser
2. Set work and break durations as needed
3. Click "Start" to begin your focus session
4. Watch your dog companion animate and collect bones

## Project Structure

```
├── index.html      # Main HTML structure
├── styles.css      # All CSS styles and animations
├── index.js        # JavaScript functionality
└── README.md       # Documentation
```

## Usage

### Timer Controls
- **Start**: Begin work/break session
- **Pause**: Temporarily stop timer
- **Stop**: Reset to work session

### Settings
- **Work Time**: Set focus session duration (1-60 minutes)
- **Break Time**: Set break duration (1-30 minutes)

### Bone Collection
- Earn 1 bone per minute of focused work
- Collect 25 bones to fill a jar
- Visual celebration when jars are completed

## Technical Details

### CSS Features
- Responsive design with mobile support
- CSS animations for dog movements
- Glassmorphism effects for modern UI
- Custom bone and jar animations

### JavaScript Features
- Modular timer state management
- Dynamic DOM manipulation
- Event-driven architecture
- Bone collection system with visual feedback

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Adding New Thoughts
Edit the `workThoughts`, `breakThoughts`, or `idleThoughts` arrays in `index.js`

### Styling Changes
Modify `styles.css` to change colors, animations, or layout

### Timer Settings
Adjust default values in the `timerState` object in `index.js`

## Animation Inspiration

Animation inspiration for dog was taken from https://uiverse.io/Emmaline-ozi/angry-dragon-5

## Contributing

Feel free to submit issues or pull requests to improve the timer!

## License

This project is open source and available under the MIT License.
