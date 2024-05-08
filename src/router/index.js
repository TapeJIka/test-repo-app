import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView";
import RegisterView from "@/views/Auth/RegisterView";
import LoginView from "@/views/Auth/LoginView";
import AlbumView from "@/views/AlbumView";
import AlbumsView from "@/views/AlbumsView";
import AlbumCreateView from "@/views/AlbumCreateView";
import ProfileView from "@/views/ProfileView";
import SearchView from "@/views/SearchView";
import VideoView from "@/views/VideoView";
import CategoriesView from "@/views/CategoriesView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/album/:id',
    name: 'album',
    component: AlbumView,
  },
  {
    path: '/albums',
    name: 'albums',
    component: AlbumsView,
  },
  {
    path: '/albumCreate',
    name: 'albumCreate',
    component: AlbumCreateView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
  },
  {
    path: '/video/:id',
    name: 'video',
    component: VideoView,
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
