# [Vue Style] style scoped && v-deep

## 背景

近期负责迁移系统项目中所使用的element-ui，将其全部替换成自研的组件库。在开发过程中发现有很多页面需要在业务中对element-ui组件进行样式覆盖的情况，主要做法是在`<style>`标签设置scoped的场景下，使用v-deep进行样式设置。在对scoped和v-deep的好奇心驱使下，做一个深入的学习记录。

## Vue Style

首先对一些基本概念做简单的介绍，一般规范的 vue 文件正常包含三部分：`<template>`、`<script>`、`<style>`。我们一般会在`<style>`维护组件样式，如何确保页面样式不会影响到全局呢？

### 样式作用域




