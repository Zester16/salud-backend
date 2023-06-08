// Uncomment these imports to begin using these cool features!

import { repository } from "@loopback/repository";
import { UserRepositoryRepository } from "../repositories";
import { post } from "@loopback/rest";
import { User } from "../models";

// import {inject} from '@loopback/core';


export class UserControllerController {
  constructor(@repository(UserRepositoryRepository)
  private userRepository: UserRepositoryRepository
  ) { }
  @post("/v1/add-user")
  async addUser() {
    const user = new User({
      emailId: "zesterschmid16",
      password: "1234",
      firstName: "zester"
    })
    return this.userRepository.create(user)

  }
}
