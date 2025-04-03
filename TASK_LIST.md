<div>
  <a href="README.md">
    <img src="https://img.shields.io/badge/README.md-purple" alt="Home">
  </a>
  <a href="TODO.md">
    <img src="https://img.shields.io/badge/TODO.md-red" alt="TODO">
  </a>
  <a href="TODO_RAW_TASK_DATA.md">
    <img src="https://img.shields.io/badge/TODO_RAW_TASK_DATA.md-orange" alt="Raw Task Data">
  </a>
  <a href="TASK_LIST.md">
    <img src="https://img.shields.io/badge/TASK_LIST.md-green" alt="Task List">
  </a>
  <a href="LICENSE.md">
    <img src="https://img.shields.io/badge/LICENSE.md-lightgrey" alt="LICENSE.md">
  </a>
</div>

---
## ▲ TASK_LIST_TEMPLATE
***
#### ▲ Node.js crypto
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### ▲ Tasks-based
```
Can you help me implement the {Enhance new-event component functionality} based on 
{RAW TASK DATA: Enhance new-event component functionality Task Details}?
```

#### ▲ Recommendation-based
```
Can you help me implement the {Enhance new-event component functionality} based on {Recommendations}?
```

#### ▲ Update `TODO.md`
```
- **Update `TODO.md`**: Reorganize the `TODO.md` file by grouping tasks by {New Tasks} and {Completed Tasks}. Add category headers under each priority section and ensure tasks are properly grouped and verified implementaions and fixes.
```

#### ▲ Next Steps
```
- **Next Steps**: What are our next steps based on the `TODO.md` list and your suggestions?
```

#### ▲ Codebase Analysis
```
- **Codebase Analysis**: Analyze the current codebase and update the `TODO.md` based on your findings and recommendations.
```

#### ▲ Implement Next Steps
```
- **Implement Next Steps**: Proceed with the next steps based on your suggestions.
```

#### ▲ Error Fixes
```
- **Error Fixes**: Implement fixes for errors based on your suggestions.
```

#### ▲ MongoDB Integration
```
- **MongoDB Integration**: How can we enhance our MongoDB integration across the project based on the `TODO.md` and your analysis?
```

#### ▲ SEO Rank Tracker Improvements
```
- **SEO Rank Tracker Improvements**: What improvements can we make in our SEO Rank Tracker project based on the `TODO.md` and your analysis?
```

#### ▲ Portfolio Project Improvements
```
- **Portfolio Project Improvements**: What improvements can we make in our Portfolio project based on the `TODO.md` and your analysis?
```

#### ▲ Code Formatting
```
- **Code Formatting**: Run `npx prettier --write .` to format all code files. Verify successful completion and fix any errors that arise.
```

#### ▲ TypeScript Type-Checking
```
- **TypeScript Type-Checking**: Run `npx tsc --noEmit` or `npm run typecheck` to type-check TypeScript code. Fix any errors that arise.
```

#### ▲ Code Linting
```
- **Code Linting**: Run `pnpm lint` to analyze code quality. Fix any errors that arise.
```

#### ▲ Repository Cleanup
```
- **Repository Cleanup**: Scan and clean up the repository by removing unnecessary files, except for `TODO.md`, `.code-workspace`, `.rules.md`, `.personal-files`, and `GitHub essential files`.
```

******
## Code Quality Inspection

- **Prettier**: `npx prettier --write .`
  - Automatically format all code files.
  - Fix any errors that arise.

- **TypeScript**: `npx tsc --noEmit` or `npm run typecheck`
  - Type-check code without generating output files.
  - Fix any errors that arise.

- **Linting**: `pnpm lint`
  - Analyze code quality and fix errors.

- **Implement Fixes**:
  - Implement fixes based on suggestions.

## Scripts

| Command                                                                                                                                    | Description                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Development**                                                                                                                            |                                                                                                                                                                                                                                                                                          |
| `pnpm dev`                                                                                                                                 | Start Next.js development server                                                                                                                                                                                                                                                         |
| `pnpm build`                                                                                                                               | Build for production                                                                                                                                                                                                                                                                     |
| `pnpm start`                                                                                                                               | Start production server                                                                                                                                                                                                                                                                  |
| **Code Quality**                                                                                                                           |                                                                                                                                                                                                                                                                                          |
| `npx prettier --write .`                                                                                                                   | Format all code files                                                                                                                                                                                                                                                                   |
| `pnpm lint`                                                                                                                                | Analyze code quality                                                                                                                                                                                                                                                                    |
| **TypeScript**                                                                                                                             |                                                                                                                                                                                                                                                                                          |
| `npx tsc --noEmit`                                                                                                                         | Type-check TypeScript code                                                                                                                                                                                                                                                              |
| **Utility**                                                                                                                                |                                                                                                                                                                                                                                                                                          |
| `Start-Process powershell -Verb RunAs -ArgumentList "Remove-Item -Path 'c:\Users\johnw\OneDrive\Desktop\portfolio\.next' -Recurse -Force"` | Remove the Next.js build directory with administrator privileges                                                                                                                                                                                                                         |

## Refactoring Guide

### Immediate Tasks

1. **Remove Duplicate UI Components and Utility Files**.
2. **Remove Unused UI Components and Utility Functions**.
3. **Improve Code Readability**.

### Redesign and Refactor

1. **Enhanced Data Visualization**: Integrate interactive charts.
2. **Robust Data Export**: Support multiple file formats.
3. **Intuitive Navigation**: Improve discoverability.
4. **Responsive Design & Accessibility**: Ensure compliance with WCAG guidelines.
5. **Code Refactoring**: Improve maintainability and scalability.
6. **Eliminate Redundancies**: Remove duplicated code and UI elements.

## Quick Start

```bash
bun clean
bun install
bun format
bun type-check
bun lint
bun build
```

## Project Structure

- `/app`: Next.js 14 app router pages and layouts
- `/components`: Reusable UI components and seller tools
- `/data`: JSON data files
- `/lib`: Utility functions and configuration
- `/public`: Static assets and images
- `/styles`: Global styles and Tailwind configuration

## Development

### Commands

```bash
bun dev              # Start Next.js dev server
bun type-check       # Run TypeScript checks
bun format           # Format code with Prettier
```

### Blog Content (MDX)

- Create new blog posts in `/app/blog/[slug]`
- Use MDX for rich content with React components
- Add metadata in `blog.json` for post listings

### UI Components

- Located in `/components/ui`
- Built with Radix UI primitives
- Use Tailwind CSS for styling

### Seller Tools

- Located in `/components/tools`
- Implement calculation logic in `/lib`
- Follow TypeScript types and interfaces
- Add error handling and input validation

## Deployment

### Vercel Configuration

```bash
bun vercel:deploy         # Deploy to production
bun vercel:deploy:preview # Create preview deployment
bun env:pull              # Sync environment variables
bun exec rimraf .next node_modules # Clean
```

## Git Commit Guidelines

Format: `type(scope): description`

- **Common Types**: `feat`, `fix`, `refactor`, `style`, `docs`, `test`
- **Scopes**: `blog`, `tools`, `ui`, `analytics`, `seo`
- **Breaking Changes**: Add `!` after scope and include `BREAKING CHANGE:` in footer.

## Architecture Analysis

- **Performance**: Evaluate dynamic imports and code splitting.
- **Accessibility**: Audit UI components for ARIA attributes and semantic HTML.
- **Type Safety**: Scrutinize data fetching layers for robust type definitions.
- **Component Organization**: Verify consistency in component structure.
- **Lighthouse Integration**: Validate performance and accessibility scoring.

## Verify Imports and Reference Files

- **Check Imports**: Verify all required modules and packages.
- **Remove Unused Imports**: Identify and remove unused imports.
- **Verify Paths**: Ensure all file paths are correct.
- **Check Dependencies**: Confirm all dependencies are installed and up-to-date.
- **Test Imports**: Run the application to ensure no runtime errors.
- **Document Imports**: Document any non-standard or critical imports.

## Getting Ready Prompt

- Ensure tools work with actual data input methods and provide meaningful analysis results.

## Refactor

- **Identify Redundancies**: Consolidate duplicate code blocks or functions.
- **Eliminate Hardcoded Values**: Replace with configurable parameters.
- **Modularize Code**: Break down large functions or components.
- **Document Changes**: Clearly document all significant changes.
- **Test Changes**: Ensure refactoring does not break existing functionality.

## Random Build/Dev Error

- **Identify the Error**: Clearly describe the error.
- **Reproduce the Error**: Try to reproduce the error consistently.
- **Debug Step-by-Step**: Address each part systematically.
- **Implement Fixes**: Make necessary changes without introducing new issues.
- **Test Thoroughly**: Verify the fix resolves the error.

## Code Review Checklist

- **Inconsistencies**: Ensure logic and code structure are consistent.
- **Bugs**: Identify and fix potential errors.
- **Missing Features**: Verify all specified functionalities are implemented.
- **Best Practices**: Ensure code follows best practices.
- **Edge Cases**: Verify code handles edge cases appropriately.
- **Outdated Dependencies**: Ensure all dependencies are up-to-date.

## Code Enhancement Suggestions

- **Performance**: Optimize performance by lazy loading components.
- **Readability**: Improve code readability with consistent naming conventions.
- **Scalability**: Make the code more scalable by modularizing components.
- **Modularity**: Identify areas for more modular or reusable code.
- **Security**: Address potential security improvements.

## UI Enhancement Suggestions

- **User Experience (UX)**: Simplify navigation and enhance feedback mechanisms.
- **Consistency**: Ensure a consistent look and feel across all components.
- **Accessibility**: Improve accessibility with ARIA labels and color contrast.
- **Responsiveness**: Ensure the UI is responsive on various devices.
- **Visual Design**: Enhance the layout with modern design patterns.
- **Performance**: Optimize UI performance.
- **Interactivity**: Ensure user interactions provide immediate feedback.

## Documentation Enhancement and Creation

- **Missing Documentation**: Create documentation for components or functions that lack it.
- **Clarity**: Ensure existing documentation is clear and concise.
- **Consistency**: Maintain a consistent style and format across all documentation.
- **Examples**: Provide usage examples for complex components or functions.
- **API Documentation**: Document all API endpoints.
- **Setup Instructions**: Ensure setup and installation instructions are detailed and up-to-date.
- **Best Practices**: Include best practices and guidelines for contributing to the codebase.

## Code Review and Enhancement Instructions

- **Inconsistencies**: Identify and resolve logic or code structure discrepancies.
- **Bugs**: Detect and address potential errors or issues.
- **Missing Features**: Verify that all specified functionalities are implemented.
- **Best Practices**: Ensure the code adheres to best practices.
- **Edge Cases**: Confirm that the code handles edge cases appropriately.
- **Outdated Dependencies**: Verify that the code runs smoothly in both local development and production environments.

## Pre-Deployment Checklist for Netlify

- **Code Quality**: Test all code changes and remove console logs and unused imports.
- **Environment Variables**: Verify environment variables in Netlify.
- **Configuration**: Confirm Astro+React+TailwindCSS+Typescript configuration settings.
- **Testing & Performance**: Run unit and integration tests and address performance issues.
- **Deployment Settings**: Configure build settings in Netlify and check deployment previews.
- **SEO & Accessibility**: Verify meta tags, descriptions, alt text, and ARIA attributes.
- **Error Monitoring & Logs**: Set up error monitoring and check Netlify logs for build issues.
- **Final Review**: Verify features, test thoroughly, and review the user experience and UI.

## Ultimate Code Review and Deployment Checklist

- **Code Quality and Best Practices**: Test all code changes and ensure adherence to coding standards.
- **Environment Variables and Security**: Verify environment variables and review the codebase for potential security vulnerabilities.
- **Integration and Configuration**: Confirm external services are correctly initialized.
- **Performance and Testing**: Run tests and identify performance bottlenecks.
- **Deployment Settings**: Configure build settings and check deployment preview links.
- **SEO and Accessibility**: Verify meta tags, titles, descriptions, alt text, and ARIA attributes.
- **Error Monitoring and Logs**: Set up error monitoring and check deployment logs.
- **Final Review and Enhancements**: Verify features, review the user experience, and suggest enhancements.
- **Dependencies and Documentation**: Review and update dependencies and ensure documentation is comprehensive.

## Custom Development Guide

- **Setup and Environment Configuration**: Initialize the project and configure environment variables.
- **Coding Standards and Best Practices**: Adhere to consistent code formatting, modularity, and documentation.
- **Development Workflow**: Use a branching strategy, conduct regular code reviews, and write tests.
- **Performance and Optimization**: Use profiling tools and optimize data fetching.
- **Security Considerations**: Validate user inputs and implement robust authentication.
- **Deployment and Release Management**: Set up a CI/CD pipeline and use a staging environment.
- **User Experience and Accessibility**: Conduct usability testing and implement accessibility features.
- **Collaboration and Communication**: Hold regular team meetings and maintain comprehensive documentation.
- **Continuous Learning and Improvement**: Stay updated with the latest technologies and regularly refactor code.

---

By following these guidelines, we can ensure an efficient and effective development process our project.
