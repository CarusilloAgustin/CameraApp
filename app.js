/*navigator.mediaDevices.enumerateDevices().then(devices => {
    console.log(devices)})*/

/* Take picture with the camera */
    /*if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)//browser supports it
    {
        navigator.mediaDevices.getUserMedia({ video:true }).then((stream) => {
        video.srcObject = stream;
        video.play();
        })
        .catch(e => log(e));
    }/*/

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let video = document.getElementById("video");
    let changeCamera = document.getElementById("turnCamera");
    let handleFlashlight = document.getElementById("flashlight");
    let textDiv = document.getElementById('text');

    /*if (video.getAttribute(facingMode) == "user")
    {
        document.getElementById("turnCamera").addEventListener("click",() => {
            video.setAttribute(facingMode, "environment");
        });
    }
    else
    {
        document.getElementById("turnCamera").addEventListener("click",() => {
            video.setAttribute(facingMode, "user");
        });
    }*/

    // default user media options
    let defaultsOpts = { audio: false, video: true }
    let shouldFaceUser = true;

    // check whether we can use facingMode
    let supports = navigator.mediaDevices.getSupportedConstraints();
    if( supports['facingMode'] === true ) {
    changeCamera.disabled = false;
    textDiv.innerText += ' /facingMode supported'
    }

    if( supports['torch'] === true ) {
        changeCamera.disabled = false;
        textDiv.innerText += ' /torch supported'
    }

    let stream = null;

    function capture() {
    defaultsOpts.video = { facingMode: shouldFaceUser ? 'user' : 'environment' }
    navigator.mediaDevices.getUserMedia(defaultsOpts)
        .then(function(_stream) {
        stream  = _stream;
        video.srcObject = stream;
        video.play();
        })
        .catch(function(err) {
        console.log(err)
        });
    }

    changeCamera.addEventListener('click', function(){
    if( stream == null ) return
    // we need to flip, stop everything
    stream.getTracks().forEach(t => {
        t.stop();
    });
    // toggle / flip
    shouldFaceUser = !shouldFaceUser;
    capture();
    })
    capture();

    document.getElementById("takePhoto").addEventListener("click",() => {
        context.drawImage(video,0 ,0 ,200 ,200);
    });

    navigator.mediaDevices.enumerateDevices().then(devices => {

        const cameras = devices.filter((device) => device.kind === 'videoinput');

        if (cameras.length === 0) {
        throw 'No camera found on this device.';
        }
        const camera = cameras[cameras.length - 1];

        // Create stream and get video track
        navigator.mediaDevices.getUserMedia({
        video: {
            deviceId: camera.deviceId
        }
        }).then(stream => {
            const track = stream.getVideoTracks()[0];

                //Create image capture object and get camera capabilities
                const imageCapture = new ImageCapture(track);
                const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {

                //todo: check if camera has a torch
                //let there be light!
                handleFlashlight.addEventListener('click', function(){
                returnedTrack.applyConstraints({
                advanced: [{torch: true}]
                    });
                });
            });
            
        });
    });

    
    /*handleFlashlight.addEventListener("click", ()  => {
        defaultsOpts.video = { facingMode: shouldFaceUser ? 'user' : 'environment' }
        navigator.mediaDevices.getUserMedia(defaultsOpts)
        .then((mediaStream) => {
          document.getElementById('#video').srcObject = mediaStream;
        
          const track = mediaStream.getVideoTracks()[0];
          track.applyConstraints({
            advanced: [{torch: true}]
          });
      });
    })*/





