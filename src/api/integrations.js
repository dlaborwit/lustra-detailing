// Stub integrations - backend functionality removed

export const Core = {
  SendEmail: async () => console.log('Email disabled - no backend'),
  InvokeLLM: async () => console.log('LLM disabled - no backend'),
  UploadFile: async () => console.log('Upload disabled - no backend'),
  GenerateImage: async () => console.log('Image generation disabled - no backend'),
  ExtractDataFromUploadedFile: async () => console.log('Extract disabled - no backend'),
  CreateFileSignedUrl: async () => console.log('URL signing disabled - no backend'),
  UploadPrivateFile: async () => console.log('Private upload disabled - no backend')
};

export const InvokeLLM = Core.InvokeLLM;
export const SendEmail = Core.SendEmail;
export const UploadFile = Core.UploadFile;
export const GenerateImage = Core.GenerateImage;
export const ExtractDataFromUploadedFile = Core.ExtractDataFromUploadedFile;
export const CreateFileSignedUrl = Core.CreateFileSignedUrl;
export const UploadPrivateFile = Core.UploadPrivateFile;
