import {
  Platform,
} from 'react-native'

export const animationPop = () => ({

  enabled: true,
  topBar: {
   
    // waitForRender: true,
    x: {
      from: 0,
      to: 1000,
      duration: 300,
      // startDelay: 1000
      interpolation: 'decelerate',
    }
  },
  content: {
    x: {
      from: 0,
      to: 1000,
      duration: 300,
      interpolation: 'accelerate',
    }
  }
});

export const animationPush = () => ({
  enabled: true,
  topBar: {
    
    waitForRender: true,
    x: {
      from: 1000,
      to: 0,
      duration: 200,
      // interpolation: 'decelerate',
      // startDelay: 1000
    }
  },
  content: {
    x: {
      from: 1000,
      to: 0,
      duration: 300,
      // interpolation: 'accelerate',
    }
  }
});

// export const animationSetRoot = () => ({
//   enable: true,
//   waitForRender: true,
//   x: {
//     from: 1000,
//     to: 0,
//     duration: 400,
//     interpolation: 'decelerate',
//   },
//   alpha: {
//     from: 0,
//     to: 1,
//     duration: 300,
//     interpolation: 'accelerate',
//   }
// })
export const animationSetRoot = () => ({
  enable: true,
  waitForRender: true,
  x: {
    from: 0,
    to: 0,
    duration: 400,
    interpolation: 'decelerate',
  },
  alpha: {
    from: 0,
    to: 1,
    duration: 300,
    interpolation: 'accelerate',
  }
})