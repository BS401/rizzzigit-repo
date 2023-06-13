const context = {
  videos: 'videos/background.mp4',
  scrollProgress: 0,
  videoProgressCheckerRunning: false
}

const checkScroll = async (window: Window, document: Document): Promise<void> => {
  if (document.location.pathname === '/') {
    const background = document.querySelector('div.background') as HTMLDivElement
    const backgroundDecorator = document.querySelector('div.backgroundDecorator') as HTMLDivElement

    const scrollProgress = context.scrollProgress = Math.min(1, document.documentElement.scrollTop / (window.innerHeight - 128))
    backgroundDecorator.style.backdropFilter = `blur(${scrollProgress * 32}px)`
    background.style.opacity = `${100 - scrollProgress * 100}%`
    if (window.innerWidth > 720) {
      background.style.top = `-${(25 / 2) + (scrollProgress * 25)}%`;
    } else {
      background.style.top = '0px'
    }
  }

  const navigationContainer = document.querySelector('div.navigationContainer')
  const footerContainer = document.querySelector('div.footerContainer')
  if (navigationContainer != null && footerContainer != null) {
    const className = 'navigationContainerOnScrollZero'
    if (document.documentElement.scrollTop === 0) {
      if (!navigationContainer.classList.contains(className)) {
        navigationContainer.classList.add(className)
      }
      if (!footerContainer.classList.contains(className)) {
        footerContainer.classList.add(className)
      }
    } else {
      if (navigationContainer.classList.contains(className)) {
        navigationContainer.classList.remove(className)
      }
      if (footerContainer.classList.contains(className)) {
        footerContainer.classList.remove(className)
      }
    }
  }
}

const setupVideo = async (element?: HTMLVideoElement): Promise<void> => {
  if (
    (element == null) ||
    (document.location.pathname !== '/')
  ) {
    return
  }

  element.src = context.videos

  const run = async (): Promise<void> => {
    if (context.videoProgressCheckerRunning) {
      return
    }

    try {
      context.videoProgressCheckerRunning = true

      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (element.paused) {
          if (context.scrollProgress != 1) {
            await element.play()
          }
        } else {
          if (context.scrollProgress == 1) {
            element.pause()
          }

          sessionStorage.setItem('videoTime', element.currentTime.toString())
        }
        await new Promise<void>((resolve) => setTimeout(resolve, 100))
      }
    } finally {
      context.videoProgressCheckerRunning = false
    }
  }

  const time = element.currentTime = ((num) => Number.isNaN(num) ? 0 : num)(Number(sessionStorage.getItem('videoTime')))
  await element.play()
  element.currentTime = time
  void run()
}

const setupNavToggle = async (document: Document): Promise<void> => {
  const element = document.querySelector('div.navigationButton')
  const navElement = document.querySelector('nav.navigationListContainer') as HTMLElement
  const mainElement = document.querySelector('div.mainContent') as HTMLDivElement

  if (
    (navElement == null) ||
    (element == null) ||
    (mainElement == null)
  ) {
    return
  }

  const toggle = (value: boolean): void => {
    if ((!value) && navElement.classList.contains('navigationButtonClicked')) {
      navElement.classList.remove('navigationButtonClicked')
    } else if (value && !navElement.classList.contains('navigationButtonClicked')) {
      navElement.classList.add('navigationButtonClicked')
    }

    mainElement.hidden = value
  }

  element.addEventListener('click', () => {
    toggle(!navElement.classList.contains('navigationButtonClicked'))
  })
}

const setupBackground = async (document: Document) => {
  const background = document.querySelector('div.background')
  const backgroundDecorator = document.querySelector('div.backgroundDecorator')

  if (document.location.pathname !== '/') {
    background?.classList.add('backgroundNotAtHome')
    backgroundDecorator?.classList.add('backgroundDecoratorNotAtHome')
  }
}

// const setupResize = async (window: Window, document: Document): Promise<void> => {
//   const background = document.querySelector('div.background')

//   window.addEventListener('resize', () => {
//     if (window.innerWidth <= 720) {

//     }
//   })
// }

export const run = async (window: Window, document: Document): Promise<void> => {
  document.addEventListener('scroll', () => { void checkScroll(window, document) })

  void checkScroll(window, document)
  void setupVideo(document.querySelector('div.background')?.children[0] as HTMLVideoElement | undefined)
  void setupBackground(document)
  void setupNavToggle(document)
}
