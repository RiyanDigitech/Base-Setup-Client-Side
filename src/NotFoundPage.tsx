import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {

    const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600">
      <Result
        status="404"
        title={<span className="text-white text-5xl font-bold">404</span>}
        subTitle={
          <span className="text-white text-xl">
            Page you're looking for doesn't exist.
          </span>
        }
        extra={
          <Button
            type="primary"
            className="bg-white text-green-600 font-semibold hover:bg-green-100"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        }
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  )
}

export default NotFoundPage
