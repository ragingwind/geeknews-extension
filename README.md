# Geeknews Web Clipper

| 기존 Geeknews 의 Bookmarklet 와 같은 동작을 하는 브라우저 익스텐션입니다. 정식 릴리즈가 되지 않아서 빌드해서 사용하시거나 릴리즈 파일에 있는 익스텐션을 메뉴얼하게 로딩하셔야 합니다.

# How to use

Chrome(Edge), Firefox, 그리고 Safari 의 익스텐션을 지원합니다. 각 브라우저 별로 개발 방법이 상이하지만 간단한 동작을 하는 익스텐션이기 때문에 빌드 과정에서만 각각의 브라우저에 맞는 설정이나 빌드 과정을 사용합니다. 빌드는 다음 명령으로 가능합니다. (pnpm 외에 다른 패키지 매니저도 사용 가능합니다) 빌드 된 파일은 `./dist` 에 모아져 있습니다.

```
pnpm build
```

## Chrome

`./src` 에 있는 소스를 그대로 사용할 수 있습니다. 빌드 과정 없이 브라우저에 로딩이 가능합니다. `chrome://extensions/` 페이지에서 `Developer mode` 를 활성화 한 후에 `Load unpacked` 를 이용하여 빌드 된 익스텐션을 로딩합니다.

<img width="1146" alt="Chrome" src="https://user-images.githubusercontent.com/124117/214009079-e6cee91c-42e1-4642-897e-21d5ebe3dba3.png">


## Firefox

빌드 과정에서 `./src` 에 있는 `manifest.json` 의 내용을 업데이트 합니다. 현재는 background page 만을 지원함으로 manifest v3 할지라도 background service worker 로 동작하지 않기 때문입니다. 따라서 빌드를 한 후 `./dist/firefox` 에 있는 패키지를 Firefox 의 `about:debugging` 에서 `Load temporary extension` 기능을 이용해서 로컬 익스텐션을 사용합니다. 이 [문서](https://extensionworkshop.com/documentation/develop/debugging/)를 참고하세요.

<img width="1146" alt="Firefox" src="https://user-images.githubusercontent.com/124117/214009060-a6ba69ec-ac63-4a7b-af80-b3d3753667e9.png">

## Safari

(역시나) Safari 의 익스텐션을 사용하기 위해서는 Safari web extension app 으로 빌드하셔야 합니다. 빌드를 하면 `./dist/Release` 에 `*.app` 앱 파일이 있습니다. 그 앱파일을 Safari 브라우저에서 로딩하여 사용해야 합니다. 이 익스텐션을 사용하기 위해서는 먼저 설치 전에 다음을 확인하세요:

- Safari Preference > Adavanced > Show Develop menu in menu bar 가 체크 되어 있어야 합니다.
- Safari Menu > Developer > Allow Unsigned Extention 이 체크 되어 있야 합니다.

다음 `*.app` 을 클릭하여 설치하고 Extension 메뉴에 현재 익스텐션 앱이 잘 로딩되어 있는지 확인하세요. 더 자세한 사항은 Safari Extension 개발이나 활용 문서들을 참고하세요.

<img width="774" alt="Safari" src="https://user-images.githubusercontent.com/124117/214009053-0173cf2a-1466-40ad-8800-0c27f42671c4.png">

# License

MIT @ Jimmy, 그 외 Geeknews 관련 저작은 그에 따릅니다.