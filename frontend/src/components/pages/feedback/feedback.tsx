import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const Feedback = () => {
  return (
    <>
      <form className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Feedback Form</h2>
        <div className="mb-4">
          <Label htmlFor="name">Name:</Label>
          <Input id="name" type="text" placeholder="Enter your name" />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="mb-4">
          <Label htmlFor="feedback">Feedback:</Label>
          <Textarea
            id="feedback"
            rows={5}
            placeholder="Enter your feedback"
          ></Textarea>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            toast.success("Thank you for your feedback!");
          }}
          className="w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};
export default Feedback;
