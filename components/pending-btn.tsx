import { Button, ButtonProps } from "./ui/button"

export function PendingButton(
  props: ButtonProps & {
    isPending: boolean
    text: string
    loadingClasses?: string
  }
) {
  const { text, isPending, loadingClasses, ...rest } = props
  const loadingClasses_ = loadingClasses ?? "bg-white"

  return (
    <Button disabled={isPending} {...rest}>
      {isPending ? (
        <div className="flex gap-1">
          <span className="sr-only">Carregando...</span>
          <div
            className={`h-1.5 w-1.5 rounded-full animate-bounce [animation-delay:-0.3s] ${loadingClasses_}`}
          ></div>
          <div
            className={`h-1.5 w-1.5 rounded-full animate-bounce [animation-delay:-0.15s] ${loadingClasses_}`}
          ></div>
          <div
            className={`h-1.5 w-1.5 rounded-full animate-bounce ${loadingClasses_}`}
          ></div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </Button>
  )
}
