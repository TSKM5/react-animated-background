# React-Animated-Background Library POC

This library provides a set of animated backgrounds that can be used in web applications.

## Installation

To install the library, you can use npm directed at this repository with the git prefix: 
```json
"react-animated-background-lib": "git+{GIT_URL}",

```

## How To Use
The component provides a canvas with the selected animation that occupies the entire parent element. 

Use like this:
```javascript
<div className='landing-bg'>
    <StarryBackground numberOfStars={100} />
</div>
```

## Extend 
To extend the library similar to other Animations:
- Add a new entity to the `src/animated-background-lib/entities` folder extending the BaseAsset class. 
- Add a component in `src/animated-background-lib/components` folder using the new entity and `animateObjects()` function. 
- Add the exported component to `src/animated-background-lib/index.ts` file. 

## Testing
- Run `npm run start` to run the demo react app. 
- Change the `src/App.tsx` file to run the desired animation.
