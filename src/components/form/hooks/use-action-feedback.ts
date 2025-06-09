import { useEffect } from "react";

type FeedbackOptions = {
  onSuccess?: () => void;
  onError?: () => void;
}

const useActionFeedback = (status: string, options: FeedbackOptions) => {
  useEffect(() => {
    if (status === "success") {
      options.onSuccess?.()

    } else if (status === "error") {
      options.onError?.()
    }
  }, [status, options])

}

export default useActionFeedback
