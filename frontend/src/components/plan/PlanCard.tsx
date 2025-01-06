import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IPlan } from "@/types/plan";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PlanPurchaseModal from "./PlanPurchaseModal";
const PlanCard = ({ plan }: { plan: IPlan }) => {
  const { description, duration, name, price } = plan;
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm text-muted-foreground">{duration} Days</div>
        <p className="text-4xl font-bold">${price}</p>
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Get Started</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <PlanPurchaseModal planId={plan._id} />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
