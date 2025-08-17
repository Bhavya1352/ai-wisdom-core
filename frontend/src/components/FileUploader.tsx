import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFileUpload: (fileName: string) => void;
}

const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState<string[]>([]);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  }, []);

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive",
        });
        return;
      }

      setUploading(prev => [...prev, file.name]);
      
      // Simulate upload
      setTimeout(() => {
        setUploading(prev => prev.filter(name => name !== file.name));
        onFileUpload(file.name);
        toast({
          title: "Upload successful",
          description: `${file.name} has been uploaded`,
        });
      }, 2000 + Math.random() * 2000);
    });
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/25 hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Drop files here</h3>
        <p className="text-muted-foreground mb-4">
          Support for PDF, DOC, TXT files up to 10MB
        </p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outline" className="cursor-pointer">
            Browse Files
          </Button>
        </label>
      </div>

      {uploading.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploading...</h4>
          {uploading.map((fileName) => (
            <div key={fileName} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <File className="h-4 w-4" />
              <span className="text-sm flex-1">{fileName}</span>
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;