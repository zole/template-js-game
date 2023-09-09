import { downloadWithMime, CanvasRecorderOpts } from '@thi.ng/dl-asset'

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter
// https://stackoverflow.com/a/42307926/72141
const videoTypes = ['webm', 'mp4', 'ogg', 'mpeg']
// const audioTypes = ['webm', 'ogg', 'mp3', 'mpeg']
const codecs = [
    'vp9',
    'vp8',
    'avc1.4d002a',
    'avc1',
    'av1',
    // Not well supported?
    // 'h265',
    // 'h.265',
    'h264',
    'h.264',
    'opus',
    'pcm',
    'aac',
    'mpeg',
    'mp4a',
    '',
]

// https://stackoverflow.com/a/65025697/72141
type MapCartesian<T extends any[][]> = {
    [P in keyof T]: T[P] extends Array<infer U> ? U : never
}

const cartesianProduct = <T extends any[][]>(...args: T): MapCartesian<T>[] =>
    args.reduce((a, b) => a.flatMap((c) => b.map((d) => [...c, d])))

function determineBestCodec() {
    // TODO: "vp8, ogg" or whatever audio and video codec?
    const mimeTypesWithVariations = cartesianProduct(
        videoTypes,
        codecs /*.flatMap((codec) => [codec, codec.toUpperCase()]) */,
    )

    return mimeTypesWithVariations
        .map(([mime, codecs]) => `video/${mime};codecs=${codecs}`)
        .find((mime) => MediaRecorder.isTypeSupported(mime))
}

function extension(mimeType: string) {
    return mimeType.split(';')[0].split('/')[1]
}

/// Convert minutes to miliseconds
function toMiliseconds(minutes: number) {
    return minutes * 60 * 1000
}

export default class Capture {
    private recorder: MediaRecorder | undefined
    private canvas: HTMLCanvasElement | undefined
    private startTime: Date | undefined
    private bestCodec: string | undefined

    get isRecording() {
        return this.recorder?.state === 'recording'
    }

    get duration() {
        if (this.startTime) {
            const ms = +new Date() - +this.startTime!
            return Math.floor(ms / 1000)
        } else {
            return 0
        }
    }

    toggleRecording(canvas: HTMLCanvasElement, filePrefix = 'capture') {
        const { recorder } = this
        if (!recorder) {
            if (!this.bestCodec) {
                this.bestCodec = determineBestCodec()
            }

            const date = new Date()
            this.startTime = date

            const localDate = new Date(
                date.getTime() - toMiliseconds(date.getTimezoneOffset()),
            )

            const mimeType = this.bestCodec // we think/hope `unassigned` will mean "dealer's choice"
            const fileName = `${filePrefix}_${localDate.toISOString()}.${extension(
                mimeType,
            )}`

            // We don't specify a frame rate, which seems to result in the best quality
            const stream = canvas.captureStream()

            // TODO: optimize bitrate
            // https://www.reddit.com/r/gfycat/comments/3pm7cn/optimizing_webm_bitrate_questions/
            const recorder = new MediaRecorder(stream, {
                mimeType,
                videoBitsPerSecond: 10_000_000,
            })

            let blobs: Blob[] = []
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    blobs.push(e.data)
                    downloadWithMime(
                        fileName,
                        new Blob(blobs, { type: mimeType }),
                        { mime: mimeType },
                    )
                    blobs = []
                }
            }

            console.log(
                'Recording started [%s, %d bps]',
                mimeType,
                recorder.videoBitsPerSecond + recorder.audioBitsPerSecond,
            )

            this.recorder = recorder
            recorder.start()
        } else {
            recorder.stop()
            // TODO: reuse recorder
            this.recorder = undefined
            console.log('Recording stopped')
        }
    }
}
