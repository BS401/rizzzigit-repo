const constants = {
  videos: 'videos/background_360p.mp4'
}

const checkScroll = async (document: Document): Promise<void> => {
  // const navigationContainer = document.querySelector('div.navigationContainer')
  // const footerContainer = document.querySelector('div.footerContainer')
  // if (navigationContainer != null && footerContainer != null) {
  //   const className = 'navigationContainerOnScrollZero'
  //   if (document.documentElement.scrollTop === 0) {
  //     if (!navigationContainer.classList.contains(className)) {
  //       navigationContainer.classList.add(className)
  //     }
  //     if (!footerContainer.classList.contains(className)) {
  //       footerContainer.classList.add(className)
  //     }
  //   } else {
  //     if (navigationContainer.classList.contains(className)) {
  //       navigationContainer.classList.remove(className)
  //     }
  //     if (footerContainer.classList.contains(className)) {
  //       footerContainer.classList.remove(className)
  //     }
  //   }
  // }
}

const setupVideo = async (element?: HTMLVideoElement): Promise<void> => {
  if (element == null) {
    return
  }

  element.src = constants.videos

  element.addEventListener('playing', () => {
    const run = async (): Promise<void> => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        sessionStorage.setItem('videoTime', element.currentTime.toString())

        await new Promise<void>((resolve) => setTimeout(resolve, 100))
      }
    }

    void run()
  })

  const time = element.currentTime = ((num) => Number.isNaN(num) ? 0 : num)(Number(sessionStorage.getItem('videoTime')))
  await element.play()
  element.currentTime = time
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
    console.log('asd')
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

export const run = async (document: Document): Promise<void> => {
  document.addEventListener('scroll', () => { void checkScroll(document) })

  void setupVideo(document.querySelector('div.background')?.children[0] as HTMLVideoElement | undefined)
  void checkScroll(document)
  void setupNavToggle(document)
}
