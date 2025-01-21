# NexAI

**NexAI** is a powerful tool designed to automate code generation by leveraging hierarchical contextual data. It simplifies the process of managing large-scale projects by generating structured code based on predefined configurations. Whether you're working on small projects or complex systems, NexAI helps you streamline your workflow and improve code quality.

## Installation

You can easily install **NexAI** using npm (Node Package Manager). To get started, run the following command in your terminal:

```bash
npm install nexai
```

This will install **NexAI** and all necessary dependencies to your project, enabling you to begin using its code generation and management capabilities.

## Quick Start Guide

To get started with **NexAI**, follow this simple flow to set up your environment and begin generating code:

### 1. Initialize the NexAI Project

Before using **NexAI**, you need to configure your project. The `create-nexai-app` command sets up everything you need, including configuration files and directories.

Run the following command to initialize your NexAI setup:

```bash
npx create-nexai-app
```

#### What this command does:
- Creates a `nexsis.config.json` configuration file with essential settings.
- Generates a `.nexsis` folder in your project directory. This folder stores important data, such as community-maintained LLM (Large Language Model) files and prompts required for NexAI’s functionality.
  
This step only needs to be performed once to get NexAI up and running in your project.

### 2. Run the NexAI CLI

The `nexai` command is the core interface for interacting with the tool. It allows you to generate code, manage prompts, and perform various other tasks based on the actions you provide.

To run the NexAI CLI, simply enter:

```bash
nexai
```

After executing the command, you’ll be presented with an interactive prompt that guides you through different options and actions based on your needs.

## Explore More

To get the most out of NexAI and understand how to use it effectively, explore our additional resources:

### **Official Documentation**

The documentation provides detailed instructions on how to:
- Use prompts and configure the NexAI package.
- Integrate it into your workflow and adapt it for various project requirements.
- Troubleshoot common issues and optimize performance.

You can find the full guide here:  
[**NexAI Documentation**](https://nexgendocs.netlify.app/)

### **Official Website**

Visit our official website to learn more about NexAI, view use cases, and stay up-to-date with new features and updates:  
[**NexAI Website**](https://nexai-alpha.vercel.app/)
