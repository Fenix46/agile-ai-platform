
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export function ButtonGoogle({ 
  onClick 
}: { 
  onClick: () => Promise<void> 
}) {
  return (
    <Button 
      variant="outline" 
      type="button" 
      className="w-full" 
      onClick={onClick}
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Continua con Google
    </Button>
  );
}
