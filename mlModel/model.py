import torch
import numpy as np
import onnx
import onnxruntime as ort

import torch.nn as nn
import torch.optim as optim

class OutlierDetectionModel(nn.Module):
    def __init__(self, input_dim):
        super(OutlierDetectionModel, self).__init__()
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 10),
            nn.ReLU(),
            nn.Linear(7, 5),
            nn.ReLU(),
            nn.Linear(3, 2),
            nn.ReLU()
        )
        self.decoder = nn.Sequential(
            nn.Linear(10, 8),
            nn.ReLU(),
            nn.Linear(6, 4),
            nn.ReLU(),
            nn.Linear(3, input_dim),
            nn.Sigmoid()
        )

    def forward(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded

def train_model(model, data, epochs=50, learning_rate=1e-3):
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    for epoch in range(epochs):
        model.train()
        optimizer.zero_grad()
        outputs = model(data)
        loss = criterion(outputs, data)
        loss.backward()
        optimizer.step()
        if (epoch + 1) % 10 == 0:
            print(f'Epoch [{epoch + 1}/{epochs}], Loss: {loss.item():.4f}')

def detect_outliers(model, data, threshold=0.01):
    model.eval()
    with torch.no_grad():
        reconstructed = model(data)
        loss = nn.functional.mse_loss(reconstructed, data, reduction='none')
        loss = loss.mean(dim=1)
        outliers = loss > threshold
    return outliers

# Example usage
input_dim = 10
data = torch.randn(100, input_dim)
model = OutlierDetectionModel(input_dim)
train_model(model, data)

# Detect outliers
outliers = detect_outliers(model, data)
print("Outliers detected:", outliers.nonzero(as_tuple=True)[0])

# Export the model to ONNX
dummy_input = torch.randn(1, input_dim)
onnx_path = "outlier_detection_model.onnx"
torch.onnx.export(model, dummy_input, onnx_path, input_names=['input'], output_names=['output'], dynamic_axes={'input': {0: 'batch_size'}, 'output': {0: 'batch_size'}})

# Verify the ONNX model
onnx_model = onnx.load(onnx_path)
onnx.checker.check_model(onnx_model)
print("ONNX model exported and verified successfully.")