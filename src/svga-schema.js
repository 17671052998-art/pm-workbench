import { parse } from "protobufjs";

// Bitmap-only subset of https://github.com/svga/SVGA-Format/blob/master/proto/svga.proto.
// Field numbers and types must remain compatible with the official SVGA 2 schema.
export const MovieEntity = parse(`
  syntax = "proto3";
  package com.opensource.svga;
  message MovieParams {
    float viewBoxWidth = 1; float viewBoxHeight = 2; int32 fps = 3; int32 frames = 4;
  }
  message Layout { float x = 1; float y = 2; float width = 3; float height = 4; }
  message Transform {
    float a = 1; float b = 2; float c = 3; float d = 4; float tx = 5; float ty = 6;
  }
  message FrameEntity { float alpha = 1; Layout layout = 2; Transform transform = 3; }
  message SpriteEntity { string imageKey = 1; repeated FrameEntity frames = 2; }
  message MovieEntity {
    string version = 1; MovieParams params = 2;
    map<string, bytes> images = 3; repeated SpriteEntity sprites = 4;
  }
`).root.lookupType("com.opensource.svga.MovieEntity");
